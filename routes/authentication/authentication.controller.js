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
    return hash(newUser.password); 
  }).then(hashedPassword => {
    return User.create({
      email: newUser.email,
      password: hashedPassword,
    });
  })
    .then(result => {
      res.status(200).send(result);
      return token(newUser.email);
    })
    .then(generatedToken => {
      res.cookie('access_token', generatedToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 12,
      });
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
  if (!existingUser.email || !existingUser.password) {
    return Error(res, 404, 'No Email and Password');
  }
  validate(existingUser, emailPasswordSchema)
    .then(value => {
      res.status(200).json(value);
      return User.findOne({ email: existingUser.email });
    })
    .then(currentUser => {
      return compair(existingUser.password, currentUser.password);
    })
    .then(result => {
      if (!result) {
        return Error(res, 401, 'Not authorized');
      }
      return token(existingUser.email);
    })
    .then(generatedToken => {
      res.cookie('access_token', generatedToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 12,
      });
    })
    .catch(err => {
      Error(res, 400, err);
    });
}