import mongoose from'mongoose';

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    type: String,
    name: String,
    price: Number
});

const itemModel = mongoose.model('Item', itemSchema);

export default itemModel;