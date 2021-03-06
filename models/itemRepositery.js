import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  id: { type: Number, required: true },
  type: String,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  barcode: String,
  count: { type: Number },
  image: { type: String },
});

export default mongoose.model('Item', itemSchema);
