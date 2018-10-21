import User from '../../models/userRepositery';
import Error from '../../helpers/error';
import {
  hash,
  compair,
} from '../../helpers/bcrypt';
import {
  emailPasswordSchema,
  validate,
} from '../../helpers/joiValidation';
import token from '../../helpers/tokenGenerator';


export function signUp(req, res) {
  const newUser = {
    password: req.body.password,
    email: req.body.email,
  };
  if (newUser.password !== req.body.confirmPassword || !newUser.email) {
    return Error(res, 400, 'Bad Request');
  }
  validate(newUser, emailPasswordSchema).then(value => {
    res.status(200).json(value);
    return hash(newUser.password).then(hashedPassword => {
      return User.create({
        email: newUser.email,
        password: hashedPassword,
      }).exec().then(result => {
        return token(res, newUser.email).then(status => {
          res.status(status).json({
            createdUser: result,
          });
        });
      });
    });
  }).catch(error => {
    Error(res, 400, error);
  });
}

export function logIn(req, res) {
  const existingUser = {
    password: req.body.password,
    email: req.body.email,
  };
  if (!existingUser.email || !existingUser.password) {
    return Error(res, 404, 'No Email and Password');
  }
  validate(existingUser, emailPasswordSchema).then(value => {
    res.status(200).json(value);
    return User.findOne({ email: existingUser.email }).then(currentUser => {
      return compair(existingUser.password, currentUser.password).then(result => {
        if (!result) {
          return Error(res, 401, 'Not authorized');
        }
        return token(res, existingUser.email).then(status => {
          res.status(status);
        });
      });
    });
  }).catch(err => {
    Error(res, 400, err);
  });
}