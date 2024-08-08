import { HttpError } from "./http.error";
import { HttpStatus } from "../http-status";
import { BodyMessage } from "../interfaces/error.interface";

/**
 * NotFoundError: Represents a Not Found HTTP error (404)
 * This error is typically thrown when the server cannot find the requested resource.
 */
export class NotFoundError extends HttpError {
  constructor(message?: BodyMessage | object, error: string = "Not Found") {
    super(message, HttpStatus.NOT_FOUND, error);
  }
}
