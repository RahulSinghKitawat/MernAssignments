const createError = (status, message, errors) => {
  const err = new Error(message);
  err.statusCode = status;
  err.errors = errors || [];
  return err;
};

const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const errors = error.details.map((d) => d.message);
      const err = createError(400, 'Validation failed', errors);
      return next(err);
    }
    req[source] = value;
    next();
  };
};

module.exports = validate;