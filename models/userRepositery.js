import mongoose from'mongoose';
import Joi from 'joi';

const userSchema = mongoose.Schema({
    id: {type: Number, required: true},
    email:  {type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
    password: {type: String, required: true},
});

userSchema.methods.joiValidate = function(obj) {
	var schema = {
		password: Joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
		email: Joi.types.String().email().required(),
	}
	return Joi.validate(obj, schema);
}

export default mongoose.model('user', userSchema);