import { HttpError } from "./http.error";
import { HttpStatus } from "../http-status";
import { BodyMessage } from "../interfaces/error.interface";

/**
 * BadRequestError: Represents a Bad Request HTTP error (400)
 * This error is typically thrown when the server cannot process the request due to invalid syntax.
 */
export class BadRequestError extends HttpError {
  constructor(message?: BodyMessage | object, error: string = "Bad Request") {
    super(message, HttpStatus.BAD_REQUEST, error);
  }
}
