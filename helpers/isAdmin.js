import { isVerified } from './JWT';
import Error from './error';
import Messages from './messages';
import User from '../models/userRepositery';

export default function tokenVerifier(req, res, next) {
  const token = req.body.token;
  isVerified(token)
    .then((user) => User.findOne({ email: user.email }))
    .then((existingUser) => {
      if (existingUser.role === 'admin') {
        next();
      }
    }).catch(err => {
      Error(res, 400, { error: err + Messages.NOT_LOGGED_IN });
    });
}