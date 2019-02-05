import User from '../../models/userRepositery';
import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';

function buy(req, res) {
  const email = req.body.email;
  const id = req.body.id;
  const quality = req.body.quality;
  const price = req.body.price;
  let toPay = req.body.toPay;
  Item.findOne({ id })
    .then(item => {
      item.count -= quality;
      return Item.update({ id }, { $set: item });
    }).then(() => {
      return User.findOne({ email });
    })
    .then(user => {
      if (toPay) {
        console.log('1 -', toPay);
        user.toPay = toPay;
        return User.update({ email }, { $set: user });
      }
      user.toPay += price * quality;
      toPay = user.toPay;
      console.log('2 ', toPay);
      return User.update({ email }, { $set: user });
    })
    .then(() => { console.log('3 ', toPay); res.status(200).send({ toPay }); })
    .catch(error => {
      Error(res, 400, { error });
    });
}

export default buy;