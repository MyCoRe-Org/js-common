import { AuthStrategy } from './types';

/**
 * Authentication strategy that uses an access token for authorization.
 * This strategy will include a Bearer token in the Authorization header.
 */
export class AccessTokenAuthStrategy implements AuthStrategy {
  /**
   * Creates an instance of the `AccessTokenClientAuthStrategy` class with the given access token.
   * @param accessToken - The access token to be used for authentication.
   */
  constructor(public accessToken: string) {}

  /**
   * Returns the authentication headers, including the Bearer token.
   * @returns A record containing the Authorization header with the Bearer token.
   */
  // eslint-disable-next-line @typescript-eslint/require-await
  public async getHeaders(): Promise<Record<string, string>> {
    return {
      Authorization: `Bearer ${this.accessToken}`,
    };
  }
}
