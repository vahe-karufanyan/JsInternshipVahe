import User from '../../models/userRepositery';
import Error from '../../helpers/error';

export function getAll(req, res) {
  User.find().exec().then(allUsers => {
    res.status(200).send(allUsers);
  }).catch(error => {
    Error(res, 400, error);
  });
}

export function reset(req, res) {
  const email = req.params.email;
  const toPay = req.body.toPay;
  User.findOne(email).exec().then(user => {
    user.toPay = toPay;
    return User.update({ email }, { $set: user });
  }).catch(error => {
    Error(res, 400, error);
  });
}

export function getByEmail(req, res) {
  const id = req.params.id;
  User.findOne(id).exec().then(doc => {
    if (doc) {
      res.status(200).json(doc);
    } else {
      Error(res, 404, 'No valid entry found for provided ID');
    }
  }).catch(err => {
    Error(res, 400, err);
  });
}