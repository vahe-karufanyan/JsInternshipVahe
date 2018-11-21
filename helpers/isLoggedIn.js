import { isVerified } from './JWT';
import Error from './error';
import Messages from './messages';
import User from '../models/userRepositery';

export default function tokenVerifier(req, res, next) {
  const token = req.cookies.access_token;
  if (User.findOne(isVerified(token).email).role !== 'admin') {
    return Error(res, 401, Messages.NOT_LOGGED_IN);
  }
  next();
}