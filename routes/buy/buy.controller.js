import User from '../../models/userRepositery';
import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';

function buy(req, res) {
  const email = req.body.email;
  const id = req.body.id;
  const count = req.body.count;
  const price = req.body.price;
  let toPay;
  Item.findOne({ id })
    .then(item => {
      item.count -= count;
      return Item.update({ id }, { $set: item });
    }).then(() => {
      return User.findOne({ email });
    })
    .then(user => {
      user.toPay += price * count;
      toPay = user.toPay;
      return User.update({ email }, { $set: user });
    })
    .then(() => { res.status(200).send({ toPay }); })
    .catch(error => {
      Error(res, 400, { error });
    });
}

export default buy;