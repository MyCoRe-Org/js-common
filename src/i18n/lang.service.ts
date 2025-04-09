/**
 * Base path for translation resource endpoint.
 */
const API_PATH = 'rsc/locale';

/**
 * Service for handling language-related operations.
 */
export class LangService {
  /**
   * Creates an instance of `LangService`.
   * @param baseUrl - The base URL or URL object.
   */
  constructor(private baseUrl: string | URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Returns the current language in ISO 639 (two character) format.
   * @returns A promise that resolves the current language.
   */
  public async getCurrentLanguage(): Promise<string> {
    const response = await fetch(this.getUrl('language'));
    if (!response.ok) {
      throw new Error('Failed to load current language');
    }
    return await response.text();
  }

  /**
   * Returns the current language in ISO 639 (two character) format.
   * @returns A promise that resolves an array of all available languages.
   */
  public async getLanguages(): Promise<string[]> {
    const response = await fetch(this.getUrl('languages'));
    if (!response.ok) {
      throw new Error('Failed to load languages');
    }
    return (await response.json()) as string[];
  }

  /**
   * Fetches a collection of translations from the given base URL and language.
   * @param prefix - The prefix for the translation.
   * @param lang - (Optional) The language code for the translations (e.g., 'en', 'de'). If not provided, the default language will be used.
   * @returns A promise that resolves to an object containing key-value pairs for translations.
   * @throws An error if the response is not successful (non-2xx HTTP status).
   */
  public async getTranslations(
    prefix: string,
    lang?: string
  ): Promise<Record<string, string>> {
    const response = await fetch(this.getTranslationPath(prefix, lang));
    if (!response.ok) {
      throw new Error('Failed to load translations');
    }
    return (await response.json()) as Record<string, string>;
  }

  /**
   * Fetches a single translation for a given name from the specified base URL and language.
   * @param name - The name or key of the translation (e.g., a specific word or phrase).
   * @param lang - (Optional) The language code for the translation (e.g., 'en', 'de'). If not provided, the default language will be used.
   * @returns A promise that resolves to the translation as a string.
   * @throws An error if the response is not successful (non-2xx HTTP status).
   */
  public async translate(name: string, lang?: string): Promise<string> {
    const response = await fetch(this.getTranslationPath(name, lang));
    if (!response.ok) {
      throw new Error('Failed to load translation');
    }
    return await response.text();
  }

  /**
   * Generates endpoint url for specified optional path.
   * @param path - The optional path.
   * @returns The full path.
   */
  private getUrl(path?: string): URL {
    return new URL(path ? `${API_PATH}/${path}` : API_PATH, this.baseUrl);
  }

  /**
   * Generates the path for a translation based on the provided name and optional language.
   * @param name - The name of the translation file.
   * @param lang - (Optional) The language code to include in the path.
   * @returns The full path to the translation file.
   */
  private getTranslationPath = (name: string, lang?: string): URL => {
    return this.getUrl(`translate/${lang ? `${lang}/` : ''}${name}`);
  };
}
