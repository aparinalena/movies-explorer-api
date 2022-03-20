const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка: Переданы некорректные данные');
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Ошибка: Ресурс не найден');
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Ошибка: У вас нет прав на удаление данного фильма');
      }
      return movie.remove()
        .then(() => res.send({ message: 'Фильм успешно удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Ошибка: Переданы некорректные данные');
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
