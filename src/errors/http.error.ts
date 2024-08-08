import { BodyMessage, HttpErrorBody } from "../interfaces/error.interface";

/**
 * HTTP errors handler class
 */
export class HttpError extends Error {
  constructor(
    readonly res: object | BodyMessage,
    readonly status: number,
    readonly error?: string,
  ) {
    super();
    // Initialize error message
    if (typeof this.res === "string") this.message = this.res;
    else
      this.message =
        this.constructor.name.replace(/[A-Z][a-z]+|[0-9]+/g, " ") || "Error";
  }

  // Get the error body
  public getBody(): HttpErrorBody | object {
    if (typeof this.res === "string" || Array.isArray(this.res)) {
      // If response is a string or an array, construct the error body
      return {
        message: this.res,
        error: this.error,
        statusCode: this.status,
      };
    }
    // If response is an object, return it as the error body
    return this.res;
  }

  // Check if an error is an instance of HttpError
  static isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError;
  }
}
