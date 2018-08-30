import items from '../../models/itemRepositery';
import Error from '../../helpers/error';

export function _getAll (req, res) {
    items.getAll().then((allItems) => {
        res.status(200).json(allItems);
    }, () => {
        Error(res, 400, 'Bad request');
    })
};

export function _getById (req, res) {
    const itemId = req.params.id;
    
    items.getById(itemId).then((item) => {
        res.status(200).json({item});
    }, () => {
        Error(res, 404, 'Item not Found');
    })
};

export function _update (req, res) {
    const item = req.body;
    const itemId = req.params.id;

    items.update(itemId, item).then((newItem) => {
        res.status(200).json({'Status':'Successfully updated', 'Id' : itemId, newItem});
    }, () => {
        Error(res, 404, 'Item not Found');
    });
}

export function _addItem (req, res) {
    const item = req.body;

    items.addItem(item).then((id) => {
        res.status(200).json({'Status':'Successfully added', 'Id' : id});
    }, () => {
        Error(res, 400, 'Bad request');
    });
}

export function _remove (req, res) {
    const itemId = req.params.id;
    
    items.remove(itemId).then(() => {
        res.status(200).json({'Status':'Successfully removed'});
    }, () => {
        Error(res, 400, 'Bad request');
    });
}

