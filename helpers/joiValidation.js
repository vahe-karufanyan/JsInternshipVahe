import Joi from 'joi';

export const emailPasswordSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});

export const itemSchema = Joi.object().keys({
  id: Joi.number().required(),
  type: Joi.string().min(3).max(20).required(),
  name: Joi.string().min(3).max(20).required(),
  price: Joi.number().max(10000).required(),
  count: Joi.number().required(),
});

export function validate(object, schema) {
  return new Promise((resolve, reject) => {
    Joi.validate(object, schema, (err, value) => {
      if (err) {
        reject();
      }
      resolve(value);
    });
  });
}