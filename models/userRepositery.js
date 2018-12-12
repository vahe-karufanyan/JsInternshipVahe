import mongoose from 'mongoose';
import Joi from 'joi';

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String },
  role: { type: String, default: 'user' },
});

userSchema.methods.joiValidate = (obj) => {
  const schema = {
    password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    email: Joi.types.String().email().required(),
    role: Joi.types.String().min(8).max(30).required(),
  };
  return Joi.validate(obj, schema);
};

export default mongoose.model('user', userSchema);