import { HttpStatus } from "../http-status";

/**
 * HTTP JSON Response Class
 */
export class HttpRes {
  declare result: any;
  declare message: string;
  declare status: number;

  /**
   * Creates an HTTP JSON response.
   * @param data - The data to be sent in the response.
   * @param status - The HTTP status code (default: 200 OK).
   * @param message - The message associated with the response (default: "Success").
   */
  constructor(
    result: any = {},
    status: number = HttpStatus.OK,
    message: string = "Success"
  ) {
    this.status = status;
    this.message = message;
    this.result = result;
  }

  static isHttpRes(obj: unknown): obj is HttpRes {
    return obj instanceof HttpRes;
  }
}
