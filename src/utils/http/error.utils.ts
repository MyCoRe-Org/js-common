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

import { UnauthorizedActionError } from '../errors/unauthorized-action';
import { PermissionError } from '../errors/permission.error';
import { ResourceNotFoundError } from '../errors/resource-not-found.error';

/**
 * Handles HTTP errors by throwing specific error types based on the response status code.
 * - `401`: Throws an `UnauthorizedActionError`.
 * - `403`: Throws a `PermissionError`.
 * - `404`: Throws a `ResourceNotFoundError`.
 * - Any other status: Throws a generic `Error`.
 * @param response - The response object from a fetch request.
 * @throws {UnauthorizedActionError} If the response status is 401 (Unauthorized).
 * @throws {PermissionError} If the response status is 403 (Forbidden).
 * @throws {ResourceNotFoundError} If the response status is 404 (Not Found).
 * @throws {Error} Throws a generic `Error` for all other status codes.
 * @example
 * try {
 *   const response = await fetch('https://api.example.com/data');
 *   handleError(response);
 *   // Process the response if no error is thrown
 * } catch (error) {
 *   // Handle the specific errors here
 *   if (error instanceof UnauthorizedActionError) {
 *     console.error('User is not authorized.');
 *   } else if (error instanceof PermissionError) {
 *     console.error('User does not have permission.');
 *   } else if (error instanceof ResourceNotFoundError) {
 *     console.error('Resource not found.');
 *   } else {
 *     console.error('An unknown error occurred.');
 *   }
 * }
 */
export const handleError = (response: Response): void => {
  if (response.status === 401) {
    throw new UnauthorizedActionError();
  } else if (response.status === 403) {
    throw new PermissionError();
  } else if (response.status === 404) {
    throw new ResourceNotFoundError();
  }
  throw new Error();
};
