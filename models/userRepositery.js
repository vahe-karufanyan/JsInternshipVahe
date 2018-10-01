import mongoose from'mongoose';

const userSchema = mongoose.Schema({
    id: {type: Number, required: true},
    email:  {type: String, required: true, unique: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/},
    password: {type: String, required: true},
});

const userModel = mongoose.model('user', userSchema);

export default userModel;