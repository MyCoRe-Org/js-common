/*
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

import { UnauthorizedActionError } from '../errors/unauthorized-action.error';
import { PermissionError } from '../errors/permission.error';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';
import { HttpError } from './http.error';

/**
 * Handles and maps errors to domain-specific exceptions.
 *
 * - If the error is an instance of `HttpError`, it is mapped to a specific domain error based on its status code.
 * - If the error is a generic `Error`, an optional message is prefixed to it.
 * - If the error type is unknown, a generic error is returned.
 * @param error - The error object to handle. Can be an `HttpError`, a generic `Error`, or any unknown type.
 * @param message - An optional custom message to prepend to the error.
 * @returns A mapped domain-specific error or a generic error if no match is found.
 * @example
 * try {
 *   const response = await fetch('https://api.example.com/data');
 * } catch (error) {
 *   throw handleError(error);
 * }
 */
export const handleError = (error: unknown, message?: string): Error => {
  const httpErrorMap = new Map<number, Error>([
    [401, new UnauthorizedActionError(message)],
    [403, new PermissionError(message)],
    [404, new ResourceNotFoundError(message)],
  ]);
  if (error instanceof HttpError) {
    return (
      httpErrorMap.get(error.status) ??
      new Error(`Unexpected error: ${String(error.status)} ${error.statusText}`)
    );
  }
  if (error instanceof Error) {
    return message ? new Error(`${message}: ${error.message}`) : error;
  }
  const unknownErrorMessage = 'An unknown error occurred.';
  return new Error(
    message ? `${message}: ${unknownErrorMessage}` : unknownErrorMessage
  );
};

/**
 * Ensures that an HTTP response has a successful status.
 * - If the response is not OK (status code is not in the range 200-299),
 *   it throws an `HttpError` with the response status and status text.
 * @param response - The fetch API response to validate.
 * @throws {HttpError} - If the response status is not OK.
 */
export const ensureOk = (response: Response): void => {
  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }
};
