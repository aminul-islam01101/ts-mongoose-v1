import { SortOrder } from 'mongoose';
import { TPaginationOptions, TPaginationResult, TSortConditions } from '../types/paginationTypes';

export const calculatePagination = (options: TPaginationOptions): TPaginationResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
export const sortConditionSetter = (sortBy: string, sortOrder: SortOrder): TSortConditions => {
  const sortConditions: TSortConditions = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  return sortConditions;
};
