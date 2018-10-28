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
import token from '../../helpers/tokenGenerator';


export function signUp(req, res) {
  const newUser = {
    password: req.body.password,
    email: req.body.email,
  };
  validateForSignUp(res, newUser, req.body.confirmPassword).then(value => {
    if (!value) {
      return Error(res, 404, 'No Email and Password');
    }
    return hash(newUser.password); 
  })
    .then(hashedPassword => User.create({
      email: newUser.email,
      password: hashedPassword,
    }))
    .then(() => token(newUser.email))
    .then(generatedToken => {
      res.cookie('access_token', generatedToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 12,
      });
      res.status(200);
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
    .then(value => {
      if (!value) {
        return Error(res, 404, 'No Email and Password');
      }
      return User.findOne({ email: existingUser.email });
    })
    .then((currentUser) => {
      return compare(existingUser.password, currentUser.password);
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
      res.status(200);
    })
    .catch(err => {
      Error(res, 400, err);
    });
}

export function logOut(req, res) {
  const email = req.params.email;
  if (!email) {
    return Error(res, 404, 'Email is missing');
  }
  User.deleteOne({ email }).then(result => {
    res.status(200).json(result);
  }).catch(err => {
    Error(res, 400, err);
  });
}