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

/**
 * Represents an access key.
 */
export type AccessKey = {
  /**
   * The unique identifier for the access key.
   */
  id: string;

  /**
   * A reference or name associated with the access key.
   */
  reference: string;

  /**
   * The secret associated with the access key used for authentication.
   */
  secret: string;

  /**
   * The permission type for the authentication.
   */
  type: string;

  /**
   * Indicates whether the access key is currently useable.
   */
  isActive: boolean;

  /**
   * An optional comment or description that provides additional context for the access key.
   */
  comment?: string;

  /**
   * An optional expiration timestamp (in Unix time) indicating when the access key expires.
   * If `null`, the key does not expire.
   */
  expiration?: number | null;
};

/**
 * DTO for updating an access key.
 */
export type CreateAccessKey = Omit<AccessKey, 'id'>;

/**
 * DTO for updating an access key.
 */
export type UpdateAccessKey = Omit<CreateAccessKey, 'secret'>;

/**
 * DTO for partially updating an access key.
 */
export type PartialUpdateAccessKey = Partial<UpdateAccessKey>;

/**
 * Represents a summary of access keys.
 */
export type AccessKeysSummary = {
  accessKeys: AccessKey[];
  totalCount: number;
};
