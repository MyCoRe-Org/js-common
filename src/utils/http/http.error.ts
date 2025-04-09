/**
 * Represents an HTTP error with a status code and status text.
 */
export class HttpError extends Error {
  /**
   * Creates a new instance of HttpError.
   * @param status - The HTTP status code (e.g., 404, 500).
   * @param statusText - The status description (e.g., "Not Found", "Internal Server Error").
   */
  constructor(
    public status: number,
    public statusText: string
  ) {
    super(`${String(status)} ${statusText}`);
  }
}
