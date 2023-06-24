import { MongoServerError } from 'mongodb';
import { TGenericErrorMessage } from '../types/errorTypes';

const handleDuplicateKeyError = (error: MongoServerError) => {
  const errors: TGenericErrorMessage[] = [
    {
      path: error.keyValue as object,
      message: `Invalid key ${Object.keys(error.keyValue as object)[0]}`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    errorName: 'DuplicateKeyError',
    errorMessages: errors,
  };
};

export default handleDuplicateKeyError;
