import mongoose from'mongoose';

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {type: Number, required: true},
    type: {type: String, required: true},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    count: Number,
});

const itemModel = mongoose.model('Item', itemSchema);

export default itemModel;