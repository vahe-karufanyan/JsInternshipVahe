import Item from '../../models/itemRepositery';
import express from 'express';
import Error from '../../helpers';
import TokenVerifier from '../../helpers/tokenVerifier'

const router = express.Router();

router.get('/?name', (req, res) => {
    TokenVerifier(req, res, next);

    const name = req.params.name;

    if(!name) {
        Error(res, 400, 'Please enter something.');
    } else {
        Item.findOne({name: thisItem.name}).exec().then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                Error(res, 404, 'No valid entry found for provided ID');
            }
        }).catch(err => {
            Error(res, 400, 'Bad request');
        });
    }
});

export default router;