/**
 * Represents an error that occurs when a user does not have the necessary permissions
 * to perform an action.
 */
export class PermissionError extends Error {
  /**
   * Creates an instance of PermissionError.
   * @param message - The error message that describes the issue.
   * @param details - Additional details about the error (e.g., reason why permissions are missing).
   */
  constructor(
    public message: string = 'User does not have the necessary permissions.',
    public details: string = ''
  ) {
    super(message);
    this.name = 'PermissionError';
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
