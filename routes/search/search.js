import User from '../../models/users';
import Item from '../../models/itemRepositery';
import express from 'express';
import Error from '../../helpers'
const router = express.Router();

router.post('/', (req, res) => {

    const thisItem = {
        id : req.body.id,
        type : req.body.type,
        name : req.body.name,
        price : req.body.price,
        counter: req.body.counter
    };

    if(!thisItem.id && !thisItem.type && !thisItem.name && !thisItem.price && !thisItem.counter) {
        Error(res, 404, 'Please enter something.');
    } else {
        Item.findOne({name: thisItem.name}).exec().then(doc => {
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
});