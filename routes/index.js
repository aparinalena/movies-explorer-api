const router = require('express').Router();
const {
  login,
  createUser,
} = require('../controllers/users');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const {
  userValidation,
  loginValidation,
} = require('../middlewares/validation');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', userValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use('*', () => {
  throw new NotFoundError('Ошибка: Запрашиваемый ресурс не найден.');
});

module.exports = router;
