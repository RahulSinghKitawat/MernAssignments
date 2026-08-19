const createError = (statusCode, message, errors = []) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.errors = errors;
  return error;
};

const badRequest = (message, errors) => createError(400, message, errors);
const unauthorized = (message) => createError(401, message);
const forbidden = (message) => createError(403, message);
const notFound = (message) => createError(404, message);
const conflict = (message) => createError(409, message);

module.exports = { createError, badRequest, unauthorized, forbidden, notFound, conflict };