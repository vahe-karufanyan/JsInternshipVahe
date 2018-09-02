import item from '../../models/itemRepositery';
import Error from '../../helpers/error';
import mongoose from 'mongoose';

export function _getAll (req, res) {
    item.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        Error(res, 400, 'Bad request');
    });
}

export function _getById (req, res) {
    const id = req.params.id;
    item.findById(id).exec().then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            Error(res, 404, 'No valid entry found for provided ID');
        }
    }).catch(err => {
        console.log(err);
        Error(res, 400, 'Bad request');
    });
}

export function _update (req, res) {
    const id = req.params.id;
    const updatedItem = {
        _id : id,
        type : req.body.type,
        name : req.body.name,
        price : req.body.price
    };
    item.update({ _id: id }, { $set: updatedItem }).exec().then(result => {
        console.log(result);
        res.status(200).json(updatedItem);
    }).catch(err => {
        console.log(err);
        Error(res, 404, 'Item not Found');
    });
}

export function _addItem (req, res) {
    const newItem = new item({
        _id: new mongoose.Types.ObjectId(),
        type: req.body.type,
        name: req.body.name,
        price: req.body.price
    });
    newItem.save().then(result => {
        console.log(result);
        res.status(201).json({
            createdItem: result
        });
    }).catch(err => {
        console.log(err);
        Error(res, 400, 'Bad Request');
    });
}

export function _remove (req, res) {
    const id = req.params.id;
    item.remove({ _id: id }).exec().then(result => {
        res.status(200).send('Successfully removed');
    }).catch(err => {
        console.log(err);
        Error(res, 400, 'Bad Request');
    });
}

