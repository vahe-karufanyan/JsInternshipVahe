import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  toPay: { type: Number, required: true },
  role: { type: String, required: true },
});

export default mongoose.model('user', userSchema);