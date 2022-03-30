const errorMessages = {
  BadRequestError: 'Ошибка: Переданы некорректные данные при добавлении фильма',
  NotFoundError: 'Фильм не найден',
  SuccessDelete: 'Фильм успешно удален',
  ForbiddenError: 'Ошибка: У вас нет прав на удаление данного фильма',
  BadRequestUser: 'Ошибка: Переданы некорректные данные',
  NotFoundUser: 'Ошибка: Пользователь не найден',
  BadEmailOrName: 'Ошибка: Переданы некорректные данные при обновлении профиля',
  DuplicateEmail: 'Ошибка: Пользователь с такой почтой уже зарегистрирован',
  NotFoundPage: 'Ресурс не найден',
  ServerError: 'На сервере произошла ошибка',
  BadUrl: 'Неправильный формат URL',
  BadEmail: 'Неправильный формат почты',
  BadEmailOrPassword: 'Неправильные почта или пароль',
  AuthorizationError: 'Необходима авторизоваться',
};

module.exports = errorMessages;
