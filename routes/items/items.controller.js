import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';

export function _getAll (req, res) {
    Item.find().exec().then(docs => {
        res.status(200).json(docs);
    }).catch(err => {
        Error(res, 400, err);
    });
}

export function _getById (req, res) {
    if (!req.params.id) {
        Error(res, 404, 'Id is missing');
        return;
    }
    const id = req.params.id;
    Item.findOne({id: id}).exec().then(doc => {
        if (!doc) {
            Error(res, 404, 'No valid entry found for provided ID');
            return;
        }
        res.status(200).json(doc);
    }).catch(err => {
        Error(res, 400, err);
    });
}

export function _update (req, res) {
    if (!req.body.name || !req.body.type || !req.body.price || !req.body.counter || !req.params.id) {
       Error(res, 404, 'No valid entry found');
       return;
    }
    const id = req.params.id;
    const updatedItem = {
        id : id,
        type : req.body.type,
        name : req.body.name,
        price : req.body.price,
        counter: req.body.counter
    };
    Item.update({ id: id }, { $set: updatedItem }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        Error(res, 404, err);
    });
}

export function _addItem (req, res) {
    if (!req.body.name || !req.body.type || !req.body.price || !req.body.counter) {
        Error(res, 404, 'No valid entry found');
        return;
    }
    const newItem = new Item({
        id: Math.round((Math.random()+1)*100000),
        type: req.body.type,
        name: req.body.name,
        price: req.body.price,
        counter: req.body.counter
    });
    newItem.save().then(result => {
        res.status(201).json(result);
    }).catch(err => {
        Error(res, 400, err);
    });
}

export function _remove (req, res) {
    if (!req.params.id) {
        Error(res, 404, 'Id is missing');
        return;
    }
    const id = req.params.id;
    Item.remove({ id: id }).exec().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        Error(res, 400, err);
    });
}