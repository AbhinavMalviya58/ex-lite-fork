import { HttpError } from "./http.error";
import { HttpStatus } from "../http-status";
import { BodyMessage } from "../interfaces/error.interface";

/**
 * InternalServerError: Represents an Internal Server Error HTTP error (500)
 * This error is typically thrown when the server encounters an unexpected condition that prevents it from fulfilling the request.
 */
export class InternalServerError extends HttpError {
  constructor(
    message?: BodyMessage | object,
    error: string = "Internal Server Error",
  ) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
}
