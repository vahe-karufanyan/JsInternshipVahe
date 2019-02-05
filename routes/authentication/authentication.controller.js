import User from '../../models/userRepositery';
import Error from '../../helpers/error';
import { hash, compare } from '../../helpers/bcrypt';
import { validateForUser } from '../../helpers/joiValidation';
import { tokenGenerator } from '../../helpers/JWT';
import Messages from '../../helpers/messages';

export function signUp(req, res) {
  const newUser = {
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password,
    email: req.body.email,
  };
  validateForUser(newUser).then(() => {
    if (newUser.password !== req.body.confirmPassword) {
      return Error(res, 400, { error: Messages.PASSWORD_DIDNT_MATCH });
    }
    return User.findOne({ email: newUser.email });
  })
    .then((maybeUser) => {
      if (maybeUser) {
        return Error(res, 400, { error: Messages.USER_EXISTS });
      }
      if (newUser.role !== 'admin') {
        newUser.role = 'user';
      }
      return hash(newUser.password);
    })
    .then(hashedPassword => User.create({
      name: newUser.name,
      surname: newUser.surname,
      email: newUser.email,
      password: hashedPassword,
      toPay: 0,
      role: newUser.role,
    }))
    .then(() => tokenGenerator(newUser.email))
    .then(generatedToken => {
      res.status(200).json({
        email: newUser.email,
        token: generatedToken,
        toPay: 0,
        role: newUser.role,
      });
    })
    .catch(error => {
      Error(res, 400, { error });
    });
}

export function logIn(req, res) {
  const existingUser = {
    name: req.body.name,
    surname: req.body.surname,
    password: req.body.password,
    email: req.body.email,
  };
  validateForUser(existingUser)
    .then(() => User.findOne({ email: existingUser.email }))
    .then((currentUser) => {
      existingUser.toPay = currentUser.toPay;
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
        name: existingUser.name,
        surname: existingUser.surname,
        email: existingUser.email,
        token: generatedToken,
        toPay: existingUser.toPay,
        role: existingUser.role,
      });
    })
    .catch(error => {
      Error(res, 400, { error });
    });
}