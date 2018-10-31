import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  id: { type: Number, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  barcode: { type: Number, required: true },
  count: Number,
});

export default mongoose.model('Item', itemSchema);