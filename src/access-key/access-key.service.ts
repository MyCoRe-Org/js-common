/*!
 * This file is part of ***  M y C o R e  ***
 * See https://www.mycore.de/ for details.
 *
 * MyCoRe is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * MyCoRe is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with MyCoRe.  If not, see <http://www.gnu.org/licenses/>.
 */

import { AuthStrategy } from '../auth';
import { handleError } from '../utils/http';
import {
  AccessKey,
  CreateAccessKey,
  PartialUpdateAccessKey,
  UpdateAccessKey,
  AccessKeysSummary,
} from './types';

/**
 * Represents the options used to query and retrieve access keys.
 */
export interface GetAccessKeysOptions {
  /**
   * An optional array of permissions to filter the access keys by.
   */
  permissions?: string[];

  /**
   * An optional reference or name to filter the access keys by.
   */
  reference?: string;

  /**
   * An optional offset value for pagination.
   */
  offset?: number;

  /**
   * An optional limit to specify the maximum number of access keys to return.
   */
  limit?: number;
}

/**
 * Base path for access key resource endpoint.
 */
const API_PATH = 'api/v2/access-keys';

/**
 * Service for managing access keys.
 */
export class AccessKeyService {
  /**
   * Creates an instance of `AccessKeyService`.
   * @param baseUrl - The base Url to make requests.
   * @param authStrategy - Optional authentication strategy function.
   */
  constructor(
    private baseUrl: string | URL,
    private authStrategy?: () => AuthStrategy
  ) {}

  /**
   * Retrieves a list of access keys.
   * @param options - The options to filter and paginate the access keys (optional).
   * @returns A promise that resolves with the access keys information.
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to request access keys.
   */
  public async getAccessKeys(
    options?: GetAccessKeysOptions
  ): Promise<AccessKeysSummary> {
    const searchParams = new URLSearchParams();
    if (options?.reference) {
      searchParams.set('reference', options.reference);
    }
    if (options?.permissions && options.permissions.length > 0) {
      searchParams.set('permissions', options.permissions.join(','));
    }
    if (options?.offset) {
      searchParams.set('offset', String(options.offset));
    }
    if (options?.limit) {
      searchParams.set('limit', String(options.limit));
    }
    try {
      const response = await fetch(this.getUrl(`?${searchParams.toString()}`), {
        headers: {
          ...this.getAuthHeaders(),
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        handleError(response);
      }
      const totalCount = response.headers.get('x-total-count');
      return {
        accessKeys: (await response.json()) as AccessKey[],
        totalCount: totalCount ? parseInt(totalCount, 10) : 0,
      } as AccessKeysSummary;
    } catch {
      throw new Error('Failed to get access keys');
    }
  }

  /**
   * Retrieves a single access key by its ID.
   * @param id - The ID of the access key.
   * @returns A promise that resolves with the access key data.
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to request access keys.
   * @throws {ResourceNotFoundError} If the access key does not exist.
   */
  public async getAccessKey(id: string): Promise<AccessKey> {
    try {
      const response = await fetch(this.getUrl(id), {
        headers: {
          ...this.getAuthHeaders(),
          Accept: 'application/json',
        },
      });
      if (!response.ok) {
        handleError(response);
      }
      return (await response.json()) as AccessKey;
    } catch {
      throw new Error('Failed to get access key');
    }
  }

  /**
   * Creates a new access key.
   * @param accessKey - The data for the new access key.
   * @returns A promise that resolves with the ID of the created access key.
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to create access key.
   */
  public async createAccessKey(accessKey: CreateAccessKey): Promise<string> {
    try {
      const response = await fetch(this.getUrl(), {
        method: 'POST',
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accessKey),
      });
      if (!response.ok) {
        handleError(response);
      }
      return response.headers.get('location')?.split('/').pop() as string;
    } catch {
      throw new Error('Failed to create access key');
    }
  }

  /**
   * Updates an existing access key.
   * @param id - The ID of the access key.
   * @param accessKey - The data to update the access key with.
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to update access key.
   * @throws {ResourceNotFoundError} If the access key does not exist.
   */
  public async updateAccessKey(
    id: string,
    accessKey: UpdateAccessKey
  ): Promise<void> {
    try {
      const response = await fetch(this.getUrl(id), {
        method: 'PUT',
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accessKey),
      });
      if (!response.ok) {
        handleError(response);
      }
    } catch {
      throw new Error('Failed to update access key');
    }
  }

  /**
   * Partially updates an existing access key.
   * @param id - The ID of the access key.
   * @param accessKey - The data to update the access key with.
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to update access key.
   * @throws {ResourceNotFoundError} If the access key does not exist.
   */
  public async patchAccessKey(
    id: string,
    accessKey: PartialUpdateAccessKey
  ): Promise<void> {
    try {
      const response = await fetch(this.getUrl(id), {
        method: 'PATCH',
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accessKey),
      });
      if (!response.ok) {
        handleError(response);
      }
    } catch {
      throw new Error('Failed to update access key');
    }
  }

  /**
   * Deletes an access key.
   * @param id - The ID of the access key to delete.
   * @throws {UnauthorizedActionError} If the user is not authorized.
   * @throws {PermissionError} If the user is not allowed to delete access key.
   * @throws {ResourceNotFoundError} If the access key does not exist.
   */
  public async deleteAccessKey(id: string): Promise<void> {
    try {
      const response = await fetch(this.getUrl(id), {
        method: 'DELETE',
        headers: {
          ...this.getAuthHeaders(),
        },
      });
      if (!response.ok) {
        handleError(response);
      }
    } catch {
      throw new Error('Failed to delete access key');
    }
  }

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
