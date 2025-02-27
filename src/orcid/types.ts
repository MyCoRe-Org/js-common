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
 * Interface representing the settings for an ORCID user.
 */
export interface OrcidUserSettings {
  /**
   * Indicates whether the system should always update the user's works in ORCID profile.
   */
  isAlwaysUpdateWork: boolean | null;

  /**
   * Indicates whether the system should allow the creation of duplicate works in ORCID profile.
   */
  isCreateDuplicateWork: boolean | null;

  /**
   * Indicates whether the system should allow the creation of the user's first work in ORCID  profile.
   */
  isCreateFirstWork: boolean | null;

  /**
   * Indicates whether the system should recreate deleted works in ORCID.
   */
  isRecreateDeletedWork: boolean | null;
}

/**
 * Interface representing the status of an ORCID user.
 */
export interface OrcidUserStatus {
  /**
   * An array of ORCID identifiers associated with the user.
   */
  orcids: string[];

  /**
   * An array of trusted ORCID identifiers.
   */
  trustedOrcids: string[];
}

/**
 * Interface representing the status of an ORCID work.
 *
 * The `OrcidWorkStatus` interface describes the status of a work, including whether the work
 * belongs to the user (`own`) and any other associated works (`other`).
 */
export type OrcidWorkStatus = {
  /**
   * The put code of a work that belongs to the user.
   */
  own: string | null;

  /**
   * An array of put codes for works that are associated with the user but not owned by them.
   */
  other: string[];
};
