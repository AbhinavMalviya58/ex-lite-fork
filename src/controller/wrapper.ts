import { Response } from "express";
import { HttpRes } from "../response";
import { ReqHandler } from "../interfaces";

// Implementation of the wrapper function.
export function wrapper(func: ReqHandler): ReqHandler {
  // Main wrapper function.
  return (req, res, next) => {
    try {
      // Execute the function
      const result = func(req, res, next);
      // Handle promises or regular values returned by the function.
      if (result instanceof Promise)
        result.then((value: any) => handleResult(value, res)).catch(next);
      else handleResult(result, res);
    } catch (error) {
      next(error);
    }
  };
}

// Handles the result returned by the wrapped function.
function handleResult(result: unknown, res: Response): void {
  if (HttpRes.isHttpRes(result)) res.status(result.status).json(result);
  else if (result && result !== res) res.send(result);
}
