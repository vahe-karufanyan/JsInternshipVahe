import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';

function _search (req, res) {
    const name = req.params.name;

    if(!name) {
        Error(res, 404, 'Please enter the name.');
        return;
    } 
    Item.findOne({name: name}).exec().then(doc => {
        if (!doc) {
            Error(res, 404, 'No Item found!');
            return;
        }
        res.status(200).json(doc);
    }).catch(err => {
        Error(res, 400, err);
    });
}

export default _search;