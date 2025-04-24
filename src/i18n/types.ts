/**
 * Interface for handling language translations and retrieval.
 */
export interface LangService {
  /**
   * Asynchronously translates a specified key into the target language.
   * @param key - The translation key to convert to localized text.
   * @returns Promise that resolves with the translated string.
   */
  translate(key: string): Promise<string>;

  /**
   * Asynchronously retrieves a group of translations under a common prefix.
   * @param prefix - The common prefix for a group of translation keys.
   * @returns Promise that resolves with an object containing key-value pairs of translations.
   */
  getTranslations(prefix: string): Promise<Record<string, string>>;
}
