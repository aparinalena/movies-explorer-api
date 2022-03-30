const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const config = require('../utils/config');
const errorMessages = require('../utils/errors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(errorMessages.AuthorizationError);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : config.JWT_SECRET_DEV);
  } catch (e) {
    throw new AuthError(errorMessages.AuthorizationError);
  }
  req.user = payload;

  return next();
};
