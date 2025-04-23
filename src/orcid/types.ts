/**
 * Interface representing the settings for an ORCID user.
 */
export interface OrcidUserSettings {
  /**
   * Indicates whether the system should always update the user's works in ORCID profile.
   */
  alwaysUpdateWork: boolean | null;

  /**
   * Indicates whether the system should allow the creation of duplicate works in ORCID profile.
   */
  createDuplicateWork: boolean | null;

  /**
   * Indicates whether the system should allow the creation of the user's first work in ORCID  profile.
   */
  createFirstWork: boolean | null;

  /**
   * Indicates whether the system should recreate deleted works in ORCID.
   */
  recreateDeletedWork: boolean | null;
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
