export type TGenericErrorMessage = {
  path: string | number | object;
  message: string;
};

export type TGenericErrorResponse = {
  statusCode: number;
  errorName: string;
  errorMessages: TGenericErrorMessage[];
};
