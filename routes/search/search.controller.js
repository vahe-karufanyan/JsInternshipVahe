import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';

function _search (req, res, next) {
    const name = req.params.name;

    if(!name) {
        Error(res, 400, 'Please enter something.');
    } else {
        Item.findOne({name: name}).exec().then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                Error(res, 404, 'No Item found!');
            }
        }).catch(err => {
            Error(res, 400, 'Bad request');
        });
    }
}

export default _search;