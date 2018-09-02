import mongoose from'mongoose';

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
});

const userModel = mongoose.model('user', userSchema);

export default userModel;