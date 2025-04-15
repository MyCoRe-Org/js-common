import { AuthStrategy } from '../auth';
import { handleError, ensureOk } from '../utils/http';
import { OrcidWorkStatus } from './types';

/**
 * Base path for orcid resource endpoint.
 */
const API_PATH = 'api/orcid/v1/';

/**
 * A service for interacting with ORCID works, including fetching work status and exporting objects.
 *
 * This service allows you to fetch the status of a work by its `objectId` and ORCID, and to export
 * works to ORCID. It can operate in both "member" and "public" modes.
 */
export class OrcidWorkService {
  /**
   * Creates an instance of `OrcidWorkService`.
   * @param baseUrl - The base Url to make requests.
   * @param authStrategy - Optional authentication strategy function.
   */
  constructor(
    private baseUrl: string | URL,
    private authStrategy?: () => AuthStrategy
  ) {}

  /**
   * Fetches the status of a work for a specific ORCID and object ID.
   * This method fetches the status of a work (owned by the user or other associated works) using
   * the provided access token, ORCID, and object ID. It can operate in "member" or "public" mode,
   * depending on the `useMember` flag.
   * @param orcid - The ORCID of the user for whom the work status is to be fetched
   * @param objectId - The object ID of the work whose status is being requested
   * @param mode - A flag indicating whether to fetch in "member" mode or "public" mode
   * @returns A promise that resolves to an `OrcidWorkStatusDto` object containing the status of the work
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to get work status.
   * @throws {Error} If an unknown error occurred.
   */
  public getWorkStatus = async (
    orcid: string,
    objectId: string,
    mode: 'member' | 'public'
  ): Promise<OrcidWorkStatus> => {
    try {
      const response = await fetch(
        this.getUrl(`${mode}/${orcid}/works/object/${objectId}`),
        {
          headers: {
            ...this.getAuthHeaders(),
            Accept: 'application/json',
          },
        }
      );
      ensureOk(response);
      return (await response.json()) as OrcidWorkStatus;
    } catch (error) {
      throw handleError(error, `Failed to fetch work status for ${objectId}.`);
    }
  };

  /**
   * Exports an object to ORCID for a specific user and object ID.
   * This method sends a POST request to export the specified object to ORCID for the provided ORCID.
   * @param orcid - The ORCID of the user to whom the object should be exported
   * @param objectId - The object ID of the work to be exported
   * @returns A promise that resolves when the export operation is completed
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to export object.
   * @throws {ResourceNotFoundError} If the object does not exist.
   * @throws {Error} If an unknown error occurred.
   */
  public exportObject = async (
    orcid: string,
    objectId: string
  ): Promise<void> => {
    try {
      const response = await fetch(
        this.getUrl(`member/${orcid}/works/object/${objectId}`),
        {
          ...this.getAuthHeaders(),
          method: 'POST',
        }
      );
      ensureOk(response);
    } catch (error) {
      throw handleError(error, `Failed to export ${objectId} to ${orcid}.`);
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

  private getAuthHeaders(): Record<string, string> {
    return this.authStrategy?.() ? this.authStrategy().getHeaders() : {};
  }
}
