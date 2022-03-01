const router = require('express').Router();
const {
  movieValidation,
  movieIdValidation,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', movieIdValidation, getMovies);

router.post('/', movieValidation, createMovie);

router.delete('/:id', deleteMovie);

module.exports = router;
