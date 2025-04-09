/**
 * Represents an error that occurs when an unauthorized action is attempted.
 */
export class UnauthorizedActionError extends Error {
  /**
   * Creates an instance of UnauthorizedActionError.
   * @param message - The error message that describes the issue.
   * @param action - The name or description of the unauthorized action attempted.
   */
  constructor(
    public message: string = 'Unauthorized action attempted.',
    public action: string = ''
  ) {
    super(message);
    this.name = 'UnauthorizedActionError';
    this.action = action;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
