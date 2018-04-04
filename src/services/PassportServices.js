import passport from 'passport';
import LocalStrategy from 'passport-local';

import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
// import { ExtractJwt } from 'passport-jwt';
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

import User from '../models/User';
import config from '../config/config';

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email, isActive }, (errFindUser, user) => {
    if (errFindUser) {
      return done(errFindUser);
    }
    if (!user) {
      return done(null, false);
    }

    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, (errCompare, isMatch) => {
      if (errCompare) {
        return done(errCompare);
      }
      if (!isMatch) {
        return done(null, false);
        // return done(null, false, {
        //   message: 'Неверное имя пользователя или пароль!'
        // });
      }
      return done(null, user);
    });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtSecret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  // User.findById(payload.sub, (err, user) => {
  User.findById(payload._id, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
