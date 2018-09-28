import mongoose from'mongoose';

const userSchema = mongoose.Schema({
    id: {type: Number, required: true},
    email:  {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    confirmpassword: {type: String, required: true},
    token: {type: Number, required: true}
});

const userModel = mongoose.model('user', userSchema);

export default userModel;