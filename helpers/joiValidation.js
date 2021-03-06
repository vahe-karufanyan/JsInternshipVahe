import Joi from 'joi';

const emailPasswordSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().required(),
});

const userSchema = Joi.object().keys({
  name: Joi.string().min(2).max(20).required(),
  surname: Joi.string().min(2).max(20).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().required(),
});

const itemSchema = Joi.object().keys({
  id: Joi.number().required(),
  type: Joi.string().min(2).max(20).required(),
  name: Joi.string().min(2).max(20).required(),
  barcode: Joi.string(),
  price: Joi.number().max(10000).required(),
  count: Joi.number(),
  image: Joi.string(),
  // image: Joi.binary().encoding('base64').max(2 * 1024 * 1024),
});

const searchSchema = Joi.object().keys({
  name: Joi.string().min(2).max(20).required(),
});

const IdSchema = Joi.object().keys({
  id: Joi.number().required(),
});

export function validateForUser(object) {
  return new Promise((resolve, reject) => {
    const error = Joi.validate(object, userSchema).error;
    if (error) {
      reject(error);
    }
    resolve();
  });
}

export function validateForLogIn(object) {
  return new Promise((resolve, reject) => {
    const error = Joi.validate(object, emailPasswordSchema).error;
    if (error) {
      reject(error);
    }
    resolve();
  });
}

export function validateForItems(object) {
  return new Promise((resolve, reject) => {
    const error = Joi.validate(object, itemSchema).error;
    if (error) {
      reject(error);
    }
    resolve();
  });
}

export function validateForSearch(object) {
  return new Promise((resolve, reject) => {
    const error = Joi.validate(object, searchSchema).error;
    if (error) {
      reject(error);
    }
    resolve();
  });
}

export function validateForId(object) {
  return new Promise((resolve, reject) => {
    const error = Joi.validate(object, IdSchema).error;
    if (error) {
      reject(error);
    }
    resolve();
  });
}