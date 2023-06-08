/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ErrorRequestHandler } from 'express';

import { ZodError } from 'zod';

import { configs } from '../configs/envConfigs';
import HandleApiError from '../shared/errors/handleApiError';
import handleValidationError from '../shared/errors/handleValidationError';
import handleZodError from '../shared/errors/handleZodError';
import { errorLogger } from '../shared/logger';
import { TGenericErrorMessage } from '../shared/sharedInterfaces';

const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (configs.env === 'development') {
    // console.log('🐱‍🏍 globalErrorHandler ~~', error);
    errorLogger.error(error);
  } else {
    errorLogger.error(error);
  }

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: TGenericErrorMessage[] = [];

  // mongoose validation error handler
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;

    // zodValidator error handler
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;

    // api error handler
  } else if (error instanceof HandleApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
    // node default error handler
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }
  // error response provider
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: configs.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
