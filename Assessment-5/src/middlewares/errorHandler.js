const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let errors = err.errors || [];

  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for '${err.path}'`;
    errors = [message];
  }
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errors = Object.values(err.errors).map(e => e.message);
    message = 'Validation error';
  }
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
    errors = [message];
  }

  const response = { success: false, message };
  if (errors.length) response.errors = errors;
  if (process.env.NODE_ENV !== 'production') response.stack = err.stack;

  res.status(statusCode).json(response);
};

module.exports = { notFound, errorHandler };