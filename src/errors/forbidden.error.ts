import { HttpError } from "./http.error";
import { HttpStatus } from "../http-status";
import { BodyMessage } from "../interfaces/error.interface";

/**
 * ForbiddenError: Represents a Forbidden HTTP error (403)
 * This error is typically thrown when the server refuses to fulfill the request.
 */
export class ForbiddenError extends HttpError {
  constructor(message?: BodyMessage | object, error: string = "Forbidden") {
    super(message, HttpStatus.FORBIDDEN, error);
  }
}
