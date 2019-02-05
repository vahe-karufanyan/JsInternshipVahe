import User from '../../models/userRepositery';
import Error from '../../helpers/error';

export function getAll(req, res) {
  User.find().exec().then(allUsers => {
    console.log(allUsers);
    res.status(200).json({
      name: allUsers.name,
      surname: allUsers.surname,
      email: allUsers.email,
      toPay: allUsers.toPay,
    });
  }).catch(err => {
    Error(res, 400, err);
  });
}

export function getByEmail(req, res) {
  const id = req.params.id;
  User.findOne(id).exec().then(doc => {
    console.log('From database', doc);
    if (doc) {
      res.status(200).json(doc);
    } else {
      Error(res, 404, 'No valid entry found for provided ID');
    }
  }).catch(err => {
    Error(res, 400, err);
  });
}