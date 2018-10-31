import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';
import {
  validateForItems,
} from '../../helpers/joiValidation';

export function getAll(req, res) {
  Item.find().then(docs => {
    res.status(200).json(docs);
  }).catch(err => {
    Error(res, 400, err);
  });
}

export function getById(req, res) {
  if (!req.params.id) {
    return Error(res, 404, 'Id is missing');
  }
  const id = req.params.id;
  Item.findOne({ id })
    .then(doc => {
      if (!doc) {
        return Error(res, 404, 'No valid entry found for provided ID');
      }
      res.status(200).json(doc);
    })
    .catch(err => {
      Error(res, 400, err);
    });
}

export function update(req, res) {
  if (!req.body.name || !req.body.type || !req.body.price || !req.body.counter || !req.params.id) {
    return Error(res, 404, 'No valid entry found');
  }
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
  if (!req.body.name || !req.body.type || !req.body.price || !req.body.counter) {
    return Error(res, 404, 'No valid entry found');
  }
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
  if (!req.params.id) {
    return Error(res, 404, 'Id is missing');
  }
  const id = req.params.id;
  Item.remove({ id }).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    Error(res, 400, err);
  });
}