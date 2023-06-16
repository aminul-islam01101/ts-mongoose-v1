export const searchFilterCalculator = (
  searchTerm: string,
  SearchableFields: string[],
  filtersData: { [key: string]: string | number | boolean }
): { $and: object[] } | object => {
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: SearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};

  return whereConditions;
};
