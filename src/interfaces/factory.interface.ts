// Import necessary types from Express
import type { Request, Response, NextFunction } from "express";

// Define the type for request handler functions
export type ReqHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => any;

// Define the type for constructors
export type Constructor<T> = new (...args: any[]) => T;
