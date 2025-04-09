/**
 * Represents an error that occurs when a requested resource is not found.
 */
export class ResourceNotFoundError extends Error {
  /**
   * Creates an instance of ResourceNotFoundError.
   * @param message - The error message that describes the issue.
   * @param resource - The name or identifier of the resource that was not found.
   */
  constructor(
    public message: string = 'Requested resource not found.',
    public resource: string = ''
  ) {
    super(message);
    this.name = 'ResourceNotFoundError';
    this.resource = resource;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
