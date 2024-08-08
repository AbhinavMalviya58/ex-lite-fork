import { HttpError } from "./http.error";
import { HttpStatus } from "../http-status";
import { BodyMessage } from "../interfaces/error.interface";
/**
 * ConflictError: Represents a Conflict HTTP error (409)
 * This error is typically thrown when the request conflicts with the current state of the server.
 */
export class ConflictError extends HttpError {
  constructor(message?: BodyMessage | object, error: string = "Conflict") {
    super(message, HttpStatus.CONFLICT, error);
  }
}
