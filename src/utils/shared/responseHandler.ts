import { Response } from 'express';

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: T;
};

export const sendApiResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  data?: T,
  error?: T
): void => {
  const apiResponse: ApiResponse<T> = { success };
  if (data !== undefined) {
    apiResponse.data = data;
  }
  if (error !== undefined) {
    apiResponse.error = error;
  }
  res.status(statusCode).send(apiResponse);
};
