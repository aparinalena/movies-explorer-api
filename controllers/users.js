const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const AuthError = require('../errors/AuthError');
const config = require('../utils/config');

const createUser = (req, res, next) => {
  const {
    name,
    email,
  } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => res.send({ email, name }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Ошибка: Переданы некорректные данные при обновлении профиля'));
      } else if (err.code === 11000) {
        next(new ConflictError('Ошибка: Пользователь с такой почтой уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError('Ошибка: Пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Произошла ошибка: Передан невалидный id'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : config.JWT_SECRET_DEV,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(new AuthError(err.message));
    });
};

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, email: req.body.email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      throw new NotFoundError('Ошибка: Пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка: Переданы некорректные данные при обновлении профиля');
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getUser,
  login,
  updateUser,
};
