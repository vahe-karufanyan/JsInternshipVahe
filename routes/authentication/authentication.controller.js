import User from '../../models/userRepositery';
import Error from '../../helpers/error';
import { hash, compare } from '../../helpers/bcrypt';
import { validateForUser } from '../../helpers/joiValidation';
import { tokenGenerator } from '../../helpers/JWT';
import Messages from '../../helpers/messages';

export function signUp(req, res) {
  const newUser = {
    password: req.body.password,
    email: req.body.email,
  };
  validateForUser(newUser).then(() => {
    if (newUser.password !== req.body.confirmPassword) {
      return Error(res, 400, Messages.PASSWORD_DIDNT_MATCH);
    }
    return User.findOne({ email: newUser.email });
  })
    .then((maybeUser) => {
      if (maybeUser) {
        return Error(res, 400, Messages.USER_EXISTS);
      }
      if (newUser.role !== 'admin') {
        newUser.role = 'user';
      }
      return hash(newUser.password);
    })
    .then(hashedPassword => User.create({
      email: newUser.email,
      password: hashedPassword,
      role: newUser.role,
    }))
    .then(() => tokenGenerator(newUser.email))
    .then(generatedToken => {
      res.status(200).json({
        email: newUser.email,
        token: generatedToken,
        role: newUser.role,
      });
    })
    .catch(err => {
      Error(res, 400, err);
    });
}

export function logIn(req, res) {
  const existingUser = {
    password: req.body.password,
    email: req.body.email,
  };
  validateForUser(existingUser)
    .then(() => User.findOne({ email: existingUser.email }))
    .then((currentUser) => {
      existingUser.role = currentUser.role;
      if (!currentUser) {
        return Error(res, 400, Messages.USER_DOES_NOT_EXIST);
      }
      return compare(existingUser.password, currentUser.password);
    })
    .then(bool => {
      if (existingUser.role !== 'admin') {
        existingUser.role = 'user';
      }
      if (bool) {
        return tokenGenerator(existingUser.email);
      }
      return Error(res, 400, Messages.WRONG_PASSWORD);
    })
    .then(generatedToken => {
      res.status(200).json({
        email: existingUser.email,
        token: generatedToken,
        role: existingUser.role,
      });
    })
    .catch(err => {
      Error(res, 400, err);
    });
}