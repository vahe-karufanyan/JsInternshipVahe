import User from '../../models/userRepositery';
import Error from '../../helpers/error';

export function getAll(req, res) {
  User.find().then(allUsers => {
    res.status(200).send(allUsers);
  }).catch(error => {
    Error(res, 400, error);
  });
}

export function reset(req, res) {
  const email = req.params.email;
  const newDebt = req.body.newDebt;
  User.findOne({ email }).then(user => {
    user.toPay = newDebt;
    return User.update({ email }, { $set: user });
  }).then(() => {
    res.status(200).json(newDebt);
  })
    .catch(error => {
      Error(res, 400, error);
    });
}


export function resetAll(req, res) {
  const emails = req.body.emails;
  let success = 0;
  emails.forEach((email) => {
    User.findOne({ email }).then(user => {
      user.toPay = 0;
      return User.update({ email }, { $set: user });
    }).then(() => {
      success += 1;
      if (success === emails.length) {
        res.status(200).json(0);
      }
    }).catch(error => {
      Error(res, 400, error);
    });
  });
}

// export function getByEmail(req, res) {
//   const id = req.params.id;
//   User.findOne(id).exec().then(doc => {
//     if (doc) {
//       res.status(200).json(doc);
//     } else {
//       Error(res, 404, 'No valid entry found for provided ID');
//     }
//   }).catch(err => {
//     Error(res, 400, err);
//   });
// }