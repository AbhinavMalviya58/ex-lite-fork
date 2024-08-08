import { HttpRes } from "./http.response";
import { HttpStatus } from "../http-status";

/**
 * API Response Class
 */
export class ApiRes {
  /**
   * OK Response function.
   */
  static ok(result: any, message?: string) {
    return new HttpRes(result, HttpStatus.OK, message || "Success");
  }

  /**
   * Created Response function.
   */
  static created(result: any, message?: string) {
    return new HttpRes(
      result,
      HttpStatus.CREATED,
      message || "Resource created successfully",
    );
  }
}
