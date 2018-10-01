import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';

import mongoose from 'mongoose';

export function _getAll (req, res, next) {
    Item.find().exec().then(docs => {
        res.status(200).json(docs);
    }).catch(err => {
        Error(res, 400, 'Bad request');
    });
}

export function _getById (req, res, next) {
    const id = req.params.id;
    Item.findOne({id: id}).exec().then(doc => {
        if (doc) {
            res.status(200).json(doc);
        } else {
            Error(res, 404, 'No valid entry found for provided ID');
        }
    }).catch(err => {
        Error(res, 400, 'Bad request');
    });
}

export function _update (req, res, next) {
    const id = req.params.id;
    const updatedItem = {
        id : id,
        type : req.body.type,
        name : req.body.name,
        price : req.body.price,
        counter: req.body.counter
    };
    Item.update({ id: id }, { $set: updatedItem }).exec().then(result => {
        res.status(200).json(updatedItem);
    }).catch(err => {
        Error(res, 404, 'Item not Found');
    });
}

export function _addItem (req, res, next) {
    const newItem = new Item({
        _id: new mongoose.Types.ObjectId(),
        id: Math.round((Math.random()+1)*100000),
        type: req.body.type,
        name: req.body.name,
        price: req.body.price,
        counter: req.body.counter
    });
    newItem.save().then(result => {
        res.status(201).json({
            createdItem: result
        });
    }).catch(err => {
        Error(res, 400, 'Bad Request');
    });
}

export function _remove (req, res, next) {
    const id = req.params.id;
    Item.remove({ id: id }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        Error(res, 400, 'Bad Request');
    });
}