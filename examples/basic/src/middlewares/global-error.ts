import logger from '../logger';
import { ErrorRequestHandler } from 'express';
import { HttpError, InternalServerError, HttpStatus } from 'ex-lite';

// global error handler
export const globalError: ErrorRequestHandler = (err, req, res, next) => {
  // http errors
  if (HttpError.isHttpError(err))
    return res.status(err.status).json(err.getBody());

  // console on error
  logger.error(err);

  // unknown errors
  return res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send(new InternalServerError(err.message).getBody());
};
