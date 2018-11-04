import Joi from 'joi';
import User from '../models/userRepositery';

const emailPasswordSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});

const itemSchema = Joi.object().keys({
  id: Joi.number().required(),
  type: Joi.string().min(3).max(20).required(),
  name: Joi.string().min(3).max(20).required(),
  price: Joi.number().max(10000).required(),
  count: Joi.number().required(),
});

const searchSchema = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
});

const IdSchema = Joi.object().keys({
  name: Joi.number().required(),
});

export function validateForSignUp(res, object, confirmPassword) {
  if (object.password !== confirmPassword) {
    return Error(res, 400, 'Passwords Didn\'t match.');
  }
  if (!User.findOne(object.email)) {
    return Error(res, 400, 'User with this E-mail exists.');
  }
  return new Promise((resolve, reject) => {
    Joi.validate(object, emailPasswordSchema, (err, value) => {
      if (err) {
        reject(err);
      }
      resolve(value);
    });
  });
}

export function validateForSignIn(res, object) {
  return new Promise((resolve, reject) => {
    Joi.validate(object, emailPasswordSchema, (err, value) => {
      if (err) {
        reject(err);
      }
      resolve(value);
    });
  });
}

export function validateForItems(object) {
  return new Promise((resolve, reject) => {
    Joi.validate(object, itemSchema, (err, value) => {
      if (err) {
        reject(err);
      }
      resolve(value);
    });
  });
}

export function validateForSearch(object) {
  return new Promise((resolve, reject) => {
    Joi.validate(object, searchSchema, (err, value) => {
      if (err) {
        reject(err);
      }
      resolve(value);
    });
  });
}

export function validateForId(object) {
  return new Promise((resolve, reject) => {
    Joi.validate(object, IdSchema, (err, value) => {
      if (err) {
        reject(err);
      }
      resolve(value);
    });
  });
}