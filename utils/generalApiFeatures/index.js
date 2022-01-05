const useGeneralApiFeatures = () => {

  const filter = (query) => {
    const queryStr = JSON.stringify(query);
    return queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  };

  const sort = (query) => {
    return query.sort ? query.sort.split(".").join(" ") : "-createdAt";
  };

  const limitFields = (query) => {
    return query.fields ? query.fields.split(".").join(" ") : "-__v";
  };

  const pagination = (query) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    const skip = (page - 1) * limit;

    return { limit, skip };
  };

  return {
    filter,
    sort,
    limitFields,
    pagination
  };
};

module.exports = useGeneralApiFeatures;
