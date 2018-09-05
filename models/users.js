import mongoose from'mongoose';

const userSchema = mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    confirmpassword: String
});

const userModel = mongoose.model('user', userSchema);

export default userModel;