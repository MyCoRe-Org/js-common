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
