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

/**
 * Represents an error that occurs when an unauthorized action is attempted.
 */
export class UnauthorizedActionError extends Error {
  public action: string;

  /**
   * Creates an instance of UnauthorizedActionError.
   * @param message - The error message that describes the issue.
   * @param action - The name or description of the unauthorized action attempted.
   */
  constructor(
    message: string = 'Unauthorized action attempted.',
    action: string = ''
  ) {
    super(message);
    this.name = 'UnauthorizedActionError';
    this.action = action;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
