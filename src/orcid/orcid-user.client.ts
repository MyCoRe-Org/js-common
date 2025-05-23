import { AuthStrategy } from '../auth/types.ts';
import { handleError, ensureOk } from '../utils/http/index.ts';
import { OrcidUserSettings, OrcidUserStatus } from './types.ts';

/**
 * Base path for orcid resource endpoint.
 */
const API_PATH = 'api/orcid/v1/';

/**
 * Client for interacting with ORCID user status and settings.
 */
export class OrcidUserApiClient {
  /**
   * Creates an instance of `OrcidUserApiClient`.
   * @param baseUrl - The base Url to make requests.
   * @param authStrategy - Optional authentication strategy function.
   */
  constructor(
    private baseUrl: string | URL,
    private authStrategy?: AuthStrategy
  ) {}

  /**
   * Retrieves the ORCID user status.
   * This method retrieves the status of the ORCID user, such as whether they are connected
   * or if their account has any issues.
   * @returns A `Promise` that resolves to the ORCID user status.
   * @throws An error if the request fails or the status cannot be retrieved.
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to get user status.
   * @throws {Error} If an unknown error occurred.
   */
  public getUserStatus = async (): Promise<OrcidUserStatus> => {
    try {
      const response = await fetch(this.getUrl('user-status'), {
        headers: {
          ...(await this.getAuthHeaders()),
          Accept: 'application/json',
        },
      });
      ensureOk(response);
      return (await response.json()) as OrcidUserStatus;
    } catch (error) {
      throw handleError(error, 'Failed to fetch Orcid user status');
    }
  };

  /**
   * Revokes authentication for a given user and ORCID.
   * @param orcid - The ORCID identifier to revoke authentication for.
   * @returns A promise that resolves when the authentication is successfully revoked.
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to revoke ORCID.
   * @throws {Error} If an unknown error occurred.
   */
  public revokeAuth = async (orcid: string): Promise<void> => {
    try {
      const response = await fetch(
        new URL(`rsc/orcid/oauth/${orcid}`, this.baseUrl),
        {
          method: 'DELETE',
          headers: {
            ...(await this.getAuthHeaders()),
          },
        }
      );
      ensureOk(response);
    } catch (error) {
      throw handleError(error, 'Failed to revoke ORCID');
    }
  };

  /**
   * Retrieves the ORCID user settings for a specific user.
   * This method retrieves settings for a specific ORCID user, identified by the ORCID identifier.
   * @param orcid - The ORCID identifier of the user whose settings are to be fetched.
   * @returns A `Promise` that resolves to the ORCID user settings.
   * @throws An error if the request fails or the settings cannot be retrieved.
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to get user settings.
   * @throws {Error} If an unknown error occurred.
   */
  public getUserSettings = async (
    orcid: string
  ): Promise<OrcidUserSettings> => {
    try {
      const response = await fetch(this.getUrl(`user-properties/${orcid}`), {
        headers: {
          ...(await this.getAuthHeaders()),
          Accept: 'application/json',
        },
      });
      ensureOk(response);
      return (await response.json()) as OrcidUserSettings;
    } catch (error) {
      throw handleError(
        error,
        `Failed to fetch ORCID user settings for ${orcid}.`
      );
    }
  };

  /**
   * Updates the ORCID user settings for a specific user.
   * This method updates the settings for the specified ORCID user with new provided settings.
   * @param orcid - The ORCID identifier of the user whose settings are to be updated.
   * @param settings - The updated settings to be applied for the ORCID user.
   * @returns A `Promise` that resolves once the settings have been successfully updated.
   * @throws An error if the request fails or the settings cannot be updated.
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to update user settings.
   * @throws {Error} If an unknown error occurred.
   */
  public updateUserSettings = async (
    orcid: string,
    settings: OrcidUserSettings
  ): Promise<void> => {
    try {
      const response = await fetch(this.getUrl(`user-properties/${orcid}`), {
        method: 'PUT',
        headers: {
          ...(await this.getAuthHeaders()),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      ensureOk(response);
    } catch (error) {
      throw handleError(
        error,
        `Failed to update ORCID user settings for ${orcid}.`
      );
    }
  };

  /**
   * Generates endpoint url for specified optional path.
   * @param path - The optional path.
   * @returns The full path.
   */
  private getUrl(path?: string): URL {
    return new URL(path ? `${API_PATH}/${path}` : API_PATH, this.baseUrl);
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    return this.authStrategy ? await this.authStrategy.getHeaders() : {};
  }
}
