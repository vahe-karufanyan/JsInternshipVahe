import User from '../../models/userRepositery';
import Item from '../../models/itemRepositery';
import Error from '../../helpers/error';


function buy(req, res) {
  const email = req.body.email;
  const id = req.body.id;
  const count = req.body.count;
  const price = req.body.price;
  Item.findOne({ id })
    .then(item => {
      item.count -= count;
      Item.update({ id }, { $set: item });
      return User.findOne(email);
    })
    .then(user => {
      user.toPay += price * count;
      return User.update({ email }, { $set: user });
    })
    .then(() => { res.status(200); })
    .catch(error => {
      Error(res, 400, { error });
    });
}

export default buy;