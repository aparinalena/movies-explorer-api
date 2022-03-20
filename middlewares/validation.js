const { celebrate, Joi } = require('celebrate');

const linkRegExp = /(http:\/\/|https:\/\/)(www)*[a-z0-9\S]*/;

const userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const userDataValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).hex(),
  }),
});

const movieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkRegExp),
    trailerLink: Joi.string().required().pattern(linkRegExp),
    thumbnail: Joi.string().required().pattern(linkRegExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  userValidation,
  userDataValidation,
  loginValidation,
  movieValidation,
  movieIdValidation,
};
