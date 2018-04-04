import jwt from 'jwt-simple';
import isEmail from 'validator/lib/isEmail';
import config from '../config/config';

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.jwtSecret);
};

// const validate = data => {
//   const errors = {};
//   if (!isEmail(data.email)) {
//     errors.email = 'Некорректный адрес эл.почты';
//   }
//
//   if (!data.email) {
//     errors.email = 'Адрес эл.почты обязателен для заполнения';
//   }
//
//   if (!data.password) {
//     errors.password = 'Пароль не может быть пустым';
//   }
//
//   return { errors, isValid: Object.keys(errors).length === 0 };
// };

const validate = data => {
  if (!isEmail(data.email)) {
    return 'Некорректный адрес эл.почты';
  }

  if (!data.email) {
    return 'Адрес эл.почты обязателен для заполнения';
  }

  if (!data.password) {
    return 'Пароль не может быть пустым';
  }

  return '';
};

module.exports = {
  validate,
  tokenForUser
};
