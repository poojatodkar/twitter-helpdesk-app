// error definitions, exception codes

const { ValidationError } = require("yup");

class BadRequestError extends Error {}
class UnauthorizedError extends Error {}
class ForbiddenError extends Error {}
class NotFoundError extends Error {}
class InternalServerError extends Error {}

module.exports = {
  BadRequestError, //400
  UnauthorizedError, // 401
  ForbiddenError, // 403
  NotFoundError, // 404
  ValidationError, // 422
  InternalServerError // 500
};
