const filterObj = (obj, ...allowedFields) => {
  let newObj = {};

  Object.keys(obj).forEach((field) => {
    if (allowedFields.includes(field)) {
      newObj[field] = obj[field];
    }
  });

  return newObj;
};

module.exports = { filterObj };
