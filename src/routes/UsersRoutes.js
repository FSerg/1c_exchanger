import express from 'express';
import passport from 'passport';

import '../services/PassportServices';
import { validate, tokenForUser } from '../services/UsersServices';

import User from '../models/User';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const router = express.Router();

router.post('/signup', (req, res) => {
  console.log('POST signup user:');
  console.log(req.body);

  let error = validate(req.body);
  if (error) {
    return res.status(400).send({ result: error });
  }
  const { email, password } = req.body;
  User.findOne({ email }, (errFind, existingUser) => {
    if (errFind) {
      console.error(errFind);
      return res.status(400).send({ result: errFind });
    }
    if (existingUser) {
      error = 'Адрес эл.почты уже используется';
      return res.status(422).send({ result: error });
    }

    const newUser = new User({ email, password });
    newUser.save(errSave => {
      if (errSave) {
        console.error(errSave);
        return res.status(400).send({ result: errSave });
      }

      return res.json({ result: { token: tokenForUser(newUser) } });
    });
  });
});

router.post('/login', requireSignin, (req, res) => {
  console.log('POST user login:');
  console.log(req.body);
  return res.json({ result: { token: tokenForUser(req.user) } });
});

export default router;
