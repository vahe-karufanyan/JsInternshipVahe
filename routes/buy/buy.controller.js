import User from '../../models/userRepositery';
import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';

export function buy(req, res) {
  const email = req.body.email;
  const id = req.body.id;
  const quantity = req.body.quantity;
  const toPay = req.body.toPay;
  Item.findOne({ id })
    .then(item => {
      console.log(item);
      console.log(quantity);
      item.count -= quantity;
      return Item.update({ id }, { $set: item });
    }).then(() => {
      return User.findOne({ email });
    })
    .then(user => {
      user.toPay = toPay;
      return User.update({ email }, { $set: user });
    })
    .then(() => { res.status(200).send({ toPay }); })
    .catch(error => {
      Error(res, 400, { error });
    });
}

export function buyAll(req, res) {
  const email = req.body.email;
  const idCount = req.body.idCount;
  const toPay = req.body.toPay;
  idCount.forEach((item) => {
    const id = item.id;
    Item.findOne({ id }).then(existingItem => {
      existingItem.count = item.count;
      return Item.update({ id }, { $set: existingItem });
    }).then();
  });
  User.findOne({ email }).then(user => {
    user.toPay = toPay;
    console.log(user.toPay);
    return User.update({ email }, { $set: user });
  })
    .then(() => { res.status(200).send({ toPay }); })
    .catch(error => {
      Error(res, 400, { error });
    });
}
