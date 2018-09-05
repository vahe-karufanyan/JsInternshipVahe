import User from '../../models/users';
import Error from '../../helpers/error';
import mongoose from 'mongoose';
import hash from '../../authentication/hash';
import compare from '../../authentication/compare'

export function _getAll (req, res) {
    User.find().exec().then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    }).catch(err => {
        console.log(err);
        Error(res, 400, 'Bad request');
    });
}

export function _getById (req, res) {
    const id = req.params.id;
    User.findOne(id).exec().then(doc => {
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

// export function _update (req, res) {
//     const id = req.params.id;
//     const updatedUser = {
//         id : id,
//         username : req.body.username,
//         password: req.body.password,
//         confirmpassword :req.body.confirmpassword
//     };
//     item.update({ id: id }, { $set: updatedUser }).exec().then(result => {
//         console.log(result);
//         res.status(200).json(updatedUser);
//     }).catch(err => {
//         console.log(err);
//         Error(res, 404, 'User not Found');
//     });
// }

export function _addUser (req, res) {
    const password = req.body.password;
    const confirmPassword = req.body.confirmpassword; 
    let newPassword;
    if (password == confirmPassword) {
        newPassword = hash(password);
        const newUser = new User({
            id: Math.round((Math.random()+1)*100000),
            username: req.body.username,
            password: newPassword,
            confirmpassword: newPassword
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
    } else {
        Error(res, 400, 'Bad Request');
    }
    
}

export function _remove (req, res) {
    const id = req.params.id;
    User.remove({ id: id }).exec().then(result => {
        res.status(200).send('Successfully removed');
    }).catch(err => {
        console.log(err);
        Error(res, 400, 'Bad Request');
    });
}

