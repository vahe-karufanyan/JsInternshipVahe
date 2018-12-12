import { isVerified } from './JWT';
import Error from './error';
import Messages from './messages';
import User from '../models/userRepositery';

export default function tokenVerifier(req, res, next) {
  const token = req.cookies.access_token;
  isVerified(token).then((user) => { console.log(user); return User.findOne(user.email); })
    .then((existingUser) => {
      if (existingUser) {
        next();
      }
    }).catch(err => {
      Error(res, 400, err + Messages.NOT_LOGGED_IN);
    });
}