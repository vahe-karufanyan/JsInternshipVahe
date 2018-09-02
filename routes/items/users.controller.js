import user from '../../models/users';
import Error from '../../helpers/error';
import mongoose from 'mongoose';

export function _getAll (req, res) {
    user.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        Error(res, 400, 'Bad request');
    });
}

export function _getById (req, res) {
    const id = req.params.id;
    user.findById(id).exec().then(doc => {
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
    const updatedUser = {
        _id : id,
        name : req.body.name,
    };
    item.update({ _id: id }, { $set: updatedUser }).exec().then(result => {
        console.log(result);
        res.status(200).json(updatedUser);
    }).catch(err => {
        console.log(err);
        Error(res, 404, 'User not Found');
    });
}

export function _addUser (req, res) {
    const newUser = new user({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
    });
    newUser.save().then(result => {
        console.log(result);
        res.status(201).json({
            createdUser: result
        });
    }).catch(err => {
        console.log(err);
        Error(res, 400, 'Bad Request');
    });
}

export function _remove (req, res) {
    const id = req.params.id;
    user.remove({ _id: id }).exec().then(result => {
        res.status(200).send('Successfully removed');
    }).catch(err => {
        console.log(err);
        Error(res, 400, 'Bad Request');
    });
}

