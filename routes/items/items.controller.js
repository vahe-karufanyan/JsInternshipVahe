import fs from 'fs';
import path from 'path';
import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';
import { validateForItems, validateForId } from '../../helpers/joiValidation';

export function getAll(req, res) {
  Item.find().then(itemsList => {
    res.status(200).json(itemsList);
  }).catch(error => {
    Error(res, 400, { error });
  });
}

export function getByType(req, res) {
  const type = req.params.type;
  Item.find({ type }).then((items) => {
    res.status(200).json(items);
  }).catch(error => {
    Error(res, 400, { error });
  });
}

export function getById(req, res) {
  const id = req.params.id;
  validateForId({ id })
    .then(() => Item.findOne({ id }))
    .then(item => {
      res.status(200).json(item);
    })
    .catch(error => {
      Error(res, 400, { error });
    });
}

export function update(req, res) {
  const updatedItem = {
    id: req.params.id,
    type: req.body.item.type,
    name: req.body.item.name,
    price: req.body.item.price,
    barcode: req.body.item.barcode,
    count: req.body.item.count,
  };
  validateForItems(updatedItem)
    .then(() => {
      Item.update({ id: updatedItem.id }, { $set: updatedItem });
    })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      Error(res, 404, { error });
    });
}

export function addItem(req, res) {
  console.log('The file has been saved!');
  const newItem = {
    id: Math.round((Math.random() + 1) * 100000),
    type: req.body.item.type,
    name: req.body.item.name,
    price: req.body.item.price,
    barcode: req.body.item.barcode,
    count: req.body.item.count,
    image: req.body.item.image,
  };
  validateForItems(newItem)
    .then(() => {
      console.log('1');
      fs.writeFile(path.resolve('./images', `${(Math.random() + 1) * 100000}.jpg`), newItem.image, 'binary', (error) => {
        if (error) {
          console.log(error);
          return Error(res, 400, error);
        }
        console.log('The file has been saved!');
      });
      return new Item(newItem).save();
    })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      console.log(error);
      Error(res, 400, { error });
    });
}


export function remove(req, res) {
  const id = req.params.id;
  const object = {
    id,
  };
  validateForId(object).then(() => Item.remove({ id })).then(result => {
    res.status(200).json(result);
  }).catch(error => {
    Error(res, 400, { error });
  });
}