/**
 * Interface that defines the structure for authentication strategies.
 */
export interface AuthStrategy {
  /**
   * Returns a record of headers required for authentication.
   * @returns A record of headers that will be sent with the request, such as an Authorization header.
   */
  getHeaders(): Promise<Record<string, string>>;
}
