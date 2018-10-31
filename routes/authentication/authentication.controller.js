import User from '../../models/userRepositery';
import Error from '../../helpers/error';
import {
  hash,
  compare,
} from '../../helpers/bcrypt';
import {
  validateForSignUp,
  validateForSignIn,
} from '../../helpers/joiValidation';
import {
  tokenGenerator,
} from '../../helpers/JWT';


export function signUp(req, res) {
  const newUser = {
    password: req.body.password,
    email: req.body.email,
  };
  validateForSignUp(res, newUser, req.body.confirmPassword).then(() => hash(newUser.password))
    .then(hashedPassword => User.create({
      email: newUser.email,
      password: hashedPassword,
    }))
    .then(() => tokenGenerator(newUser.email))
    .then(generatedToken => {
      res.cookie('access_token', generatedToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 12,
      });
      res.status(200).send();
    })
    .catch(error => {
      Error(res, 400, error);
    });
}

export function logIn(req, res) {
  const existingUser = {
    password: req.body.password,
    email: req.body.email,
  };
  validateForSignIn(res, existingUser)
    .then(() => User.findOne({ email: existingUser.email }))
    .then((currentUser) => compare(existingUser.password, currentUser.password))
    .then(() => tokenGenerator(existingUser.email))
    .then(generatedToken => {
      res.cookie('access_token', generatedToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 12,
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