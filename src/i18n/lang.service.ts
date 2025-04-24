import { LangApiClient } from './lang.client';
import { LangService } from './types';
import { Cache } from '../utils/cache';

/**
 * Cached implementation of LangService that provides translation services with caching capabilities.
 */
export class DefaultLangService implements LangService {
  /**
   * Creates an instance of `DefaultLangService`.
   * @param langClient - API client for translation services.
   * @param currentLang - Currently selected language code.
   * @param cache - Optional cache storage for translations.
   */
  constructor(
    private langClient: LangApiClient,
    public readonly currentLang: string,
    private cache?: Cache<string>
  ) {}

  /**
   * Retrieves translation for a key with caching mechanism.
   * @param key - Translation key to retrieve.
   * @returns Promise resolving to translated string.
   * @throws {Error} If key ends with '*' (reserved for bulk operations)
   */
  public async translate(key: string): Promise<string> {
    if (key.endsWith('*')) {
      throw new Error('Suffix "*" is not allowed');
    }
    if (!this.cache) return await this.safeTranslate(key);
    const cached = this.cache.getItem(key);
    if (cached) return cached;
    const value = await this.safeTranslate(key);
    this.cache.setItem(key, value);
    return value;
  }

  /**
   * Retrieves multiple translations matching a prefix pattern
   * @param prefix - Translation key prefix ending with '*'.
   * @returns Object with matched translations.
   * @throws {Error} If prefix doesn't end with '*'.
   */
  public async getTranslations(
    prefix: string
  ): Promise<Record<string, string>> {
    if (!prefix.endsWith('*')) {
      throw new Error('Prefix must end with "*"');
    }
    if (!this.cache)
      return await this.langClient.getTranslations(prefix, this.currentLang);
    if (this.cache.getItem(prefix) !== null)
      return this.extractTranslations(this.cache, prefix);
    const translations = await this.langClient.getTranslations(
      prefix,
      this.currentLang
    );
    this.cacheTranslations(this.cache, prefix, translations);
    return translations;
  }

  private extractTranslations(
    cache: Cache<string>,
    prefix: string
  ): Record<string, string> {
    const cachePrefix = prefix.slice(0, -1);
    return Object.fromEntries(
      Object.entries(cache.getAllItems()).filter(
        ([key]) => key.startsWith(cachePrefix) && !key.startsWith(prefix)
      )
    );
  }

  private cacheTranslations(
    cache: Cache<string>,
    prefix: string,
    translations: Record<string, string>
  ): void {
    Object.entries(translations).forEach(([key, value]) => {
      cache.setItem(key, value);
    });
    cache.setItem(prefix, '');
  }

  private async safeTranslate(key: string): Promise<string> {
    try {
      return await this.langClient.translate(key, this.currentLang);
    } catch (error) {
      console.warn(`Translation for "${key}" failed.`, error);
      return `??${key}??`;
    }
  }
}
