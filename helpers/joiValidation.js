import Joi from 'joi';

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

export function validateForSignUp(res, object, confirmPassword) {
  if (object.password !== confirmPassword || !object.email) {
    return Error(res, 400, 'Bad Request');
  }
  return new Promise((resolve, reject) => {
    Joi.validate(object, emailPasswordSchema, (err, value) => {
      if (err || !value) {
        reject(err);
      }
      resolve(value);
    });
  });
}

export function validateForSignIn(res, object) {
  if (!object.email || !object.password) {
    return Error(res, 404, 'No Email and Password');
  }
  return new Promise((resolve, reject) => {
    Joi.validate(object, emailPasswordSchema, (err, value) => {
      if (err || !value) {
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