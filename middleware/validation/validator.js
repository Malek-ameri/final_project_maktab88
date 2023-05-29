const createError = require("http-errors");

const validator = (objectSchema) => (req, res, next) => {
  const { error } = objectSchema.validate(req.body);

  if (!!error) {
    return next(createError(400, error.message));
  }
  next();
};

module.exports = { validator}