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
    role: req.body.role,
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
      return hash(newUser.password);
    })
    .then(hashedPassword => User.create({
      email: newUser.email,
      password: hashedPassword,
    }))
    .then(() => tokenGenerator(newUser.email))
    .then(generatedToken => {
      res.cookie('access_token', generatedToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 48,
      });
      res.status(200).send();
    })
    .catch(err => {
      Error(res, 400, err);
    });
}

export function logIn(req, res) {
  const existingUser = {
    password: req.body.password,
    email: req.body.email,
    role: req.body.role,
  };
  validateForUser(existingUser)
    .then(() => User.findOne({ email: existingUser.email }))
    .then((currentUser) => {
      if (!currentUser) {
        return Error(res, 400, Messages.USER_DOES_NOT_EXIST);
      }
      return compare(existingUser.password, currentUser.password);
    })
    .then(() => tokenGenerator(existingUser.email))
    .then(generatedToken => {
      res.cookie('access_token', generatedToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 48,
      });
      res.status(200).send();
    })
    .catch(err => {
      Error(res, 400, err);
    });
}

export function logOut(req, res) {
  res.clearCookie('access_token');
  res.status(200).send();
}