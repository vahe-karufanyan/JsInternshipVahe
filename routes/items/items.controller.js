import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';
import { validateForItems, validateForId } from '../../helpers/joiValidation';

export function getAll(req, res) {
  Item.find().then(itemsList => {
    res.status(200).json(itemsList);
  }).catch(err => {
    Error(res, 400, err);
  });
}

export function getById(req, res) {
  const id = req.params.id;
  validateForId({ id })
    .then(() => Item.findOne({ id }))
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      Error(res, 400, err);
    });
}

export function update(req, res) {
  const updatedItem = {
    id: req.params.id,
    type: req.body.type,
    name: req.body.name,
    price: req.body.price,
    barcode: req.body.barcode,
    counter: req.body.counter,
  };
  validateForItems(updatedItem)
    .then(() => Item.update({ id: updatedItem.id }, { $set: updatedItem }))
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      Error(res, 404, err);
    });
}

export function addItem(req, res) {
  const newItem = new Item({
    id: Math.round((Math.random() + 1) * 100000),
    type: req.body.type,
    name: req.body.name,
    price: req.body.price,
    barcode: req.body.barcode,
    counter: req.body.counter,
  });
  validateForItems(newItem)
    .then(() => newItem.save())
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      Error(res, 400, err);
    });
}

export function remove(req, res) {
  const id = req.params.id;
  const object = {
    id,
  };
  validateForId(object)
    .then(() => Item.remove({ id }).then(result => {
      res.status(200).json(result);
    }).catch(err => {
      Error(res, 400, err);
    }));
}