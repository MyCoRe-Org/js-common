import { AuthStrategy } from './types';

/**
 * Authentication strategy that uses an access token for authorization.
 * This strategy will include a Bearer token in the Authorization header.
 */
export class AccessTokenAuthStrategy implements AuthStrategy {
  private readonly accessToken;

  /**
   * Creates an instance of the `AccessTokenClientAuthStrategy` class with the given access token.
   * @param accessToken - The access token to be used for authentication.
   */
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Returns the authentication headers, including the Bearer token.
   * @returns A record containing the Authorization header with the Bearer token.
   */
  public getHeaders(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.accessToken}`,
    };
  }

  /**
   * Getter for the access token.
   * @returns The access token.
   */
  public getAccessToken(): string {
    return this.accessToken;
  }
}
