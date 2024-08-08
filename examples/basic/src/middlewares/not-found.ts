import { RequestHandler } from 'express';
import { NotFoundError } from 'ex-lite';

// not found request handler
export const notFound: RequestHandler = (req, res) => {
  // not found error
  const error = new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`);
  // response
  res.status(error.status).json(error.getBody());
};
