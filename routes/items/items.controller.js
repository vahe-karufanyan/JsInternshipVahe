import fs from 'fs';
import path from 'path';
import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';
import { validateForItems, validateForId } from '../../helpers/joiValidation';

// let _chunks = [];

export function getAll(req, res) {
  Item.find().then(itemsList => {
    res.status(200).json(itemsList);
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
  // console.log(req.file);
  const newItem = {
    id: Math.round((Math.random() + 1) * 100000),
    type: req.body.item.type,
    name: req.body.item.name,
    price: req.body.item.price,
    barcode: req.body.item.barcode,
    count: req.body.item.count,
    image: req.body.item.image,
  };
  console.log(newItem.image);
  validateForItems(newItem)
    .then(() => {
      // fs.writeFile(path.resolve('./images', `${newItem.id}`), newItem.image, 'base64', (error) => {
      //   if (error) {
      //     console.log(error);
      //     return Error(res, 400, error);
      //   }
      //   console.log('The file has been saved!');
      // });
      // newItem.image = `C:\\Users\\vkarufanyan\\Work\\SweetBox\\JsInternshipVahe\\images\\${newItem.id}`;
      return new Item(newItem).save();
    })
    .then(result => {
      return res.status(201).json(result);
    })
    .catch(error => {
      console.log(error);
      return Error(res, 400, { error });
    });
}

export function getImage(req, res) {
  const id = req.params.id;
  Item.findOne({ id }).then(item => {
    console.log(item.image);
    return res.status(200).send(item.image);
  }).catch(error => {
    return Error(res, 400, { error });
  });
  // fs.readFile(`C:\\Users\\vkarufanyan\\Work\\SweetBox\\JsInternshipVahe\\images\\${id}`, (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     return Error(res, 400, { error: err });
  //   }
  //   const image = data;
  //   console.log(image);
  //   res.status(200).send(image);
  // });
}

// export function imageChunks(req, res) {
//   let image;
//   _chunks.push(req.body.chunk);
//   if (req.body.final === true) {
//     const name = req.body.name;
//     image = _chunks.join('');
//     _chunks = [];
//     fs.writeFile(path.resolve('./images', `${name}`), image, 'base64', (error) => {
//       if (error) {
//         console.log(error);
//         return Error(res, 400, error);
//       }
//     });
//     Item.findOne({ name }).then(item => {
//       item.image = `./images/${name}`;
//       return Item.update({ name }, { $set: item });
//     }).then(updateMessage => {
//       console.log('The file has been saved!');
//       return res.status(201).json({ updateMessage });
//     }).catch(error => {
//       Error(res, 400, { error });
//       console.log(error + 'error');
//     });
//     console.log(image.length);
//   }
//   console.log('image.length');
//   return res.status(200).json({ res: 'ok' });
// }

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
