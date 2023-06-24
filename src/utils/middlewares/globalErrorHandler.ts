/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ErrorRequestHandler } from 'express';

import { ZodError } from 'zod';

import { configs } from '../configs/envConfigs';
import { HandleApiError } from '../shared/errors/handleApiError';
import handleCastError from '../shared/errors/handleCastError';
import handleDuplicateKeyError from '../shared/errors/handleDuplicateKeyError';
import handleMissingSchemaError from '../shared/errors/handleMissingSchemaError';
import handleValidationError from '../shared/errors/handleValidationError';
import handleZodError from '../shared/errors/handleZodError';
import { errorLogger } from '../shared/logger';
import { TGenericErrorMessage } from '../shared/types/errorTypes';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (configs.env === 'development') {
    // console.log('🐱‍🏍 globalErrorHandler ~~', error);
    errorLogger.error(error);
  } else {
    errorLogger.error(error);
  }

  let statusCode = 500;
  let errorName = 'Something went wrong !';
  let errorMessages: TGenericErrorMessage[] = [];

  // mongoose validation error handler
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    errorName = simplifiedError.errorName;
    errorMessages = simplifiedError.errorMessages;
  }
  // mongoose validation error handler
  else if (error?.name === 'MongoServerError' && (error.code === 11000 || error.code === 11001)) {
    const simplifiedError = handleDuplicateKeyError(error);
    statusCode = simplifiedError.statusCode;
    errorName = simplifiedError.errorName;
    errorMessages = simplifiedError.errorMessages;
  }
  // zodValidator error handler
  else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    errorName = simplifiedError.errorName;
    errorMessages = simplifiedError.errorMessages;
  }
  // handleCastError error handler
  else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    errorName = simplifiedError.errorName;
    errorMessages = simplifiedError.errorMessages;
  }
  // MissingSchemaError error handler
  else if (error?.name === 'MissingSchemaError') {
    const simplifiedError = handleMissingSchemaError(error);
    statusCode = simplifiedError.statusCode;
    errorName = simplifiedError.errorName;
    errorMessages = simplifiedError.errorMessages;
  }

  // api error handler
  else if (error instanceof HandleApiError) {
    statusCode = error?.statusCode;
    errorName = error.message;
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
    errorName = error?.message;
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
    errorName,
    url: configs.env !== 'production' ? req.url : undefined,
    errorMessages,
    stack: configs.env !== 'production' ? error?.stack : undefined,
  });
};

export default globalErrorHandler;
