



import express from 'express';
import items from '../models/itemRepositery';
import Error from '../helpers/error';
import IdGen from '../helpers/idGenerator';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(items.getAll());
    res.status(200);
    // Error(res, 400, 'Bad request');
});

router.get('/:id', (req, res) => {
    const itemId = req.params.id;

    //const itemId = IdGen;

    var item = items.getById(itemId);
    if(item) {
        let itemJson = {
            id: item.id,
            type: item.type,
            name: item.name,
            price: item.price
        }
        res.status(200);
        res.json(itemJson);
    }
    else {
        Error(res, 404, 'Not Found');
    }
});

router.put('/:id', (req, res) => {
    const item = req.body;

    items.update(item);
    res.status(200).json({'Status':'Successfully updated'});
});

router.post('/', (req, res) => {
    const item = req.body;

    items.addItem(item);
    res.status(200).json({'Status':'Successfully added'});
});

router.delete('/', (req, res) => {

    items.remove();
    res.status(200).json({'Status':'Successfully deleted'});
});

module.exports = router;