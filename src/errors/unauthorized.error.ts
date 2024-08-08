import { HttpError } from "./http.error";
import { HttpStatus } from "../http-status";
import { BodyMessage } from "../interfaces/error.interface";

/**
 * UnauthorizedError: Represents an Unauthorized HTTP error (401)
 * This error is typically thrown when the request lacks valid authentication credentials.
 */
export class UnauthorizedError extends HttpError {
  constructor(message?: BodyMessage | object, error: string = "Unauthorized") {
    super(message, HttpStatus.UNAUTHORIZED, error);
  }
}
