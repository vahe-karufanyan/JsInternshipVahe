import { isVerified } from './JWT';
import Error from './error';
import Messages from './messages';

export default function tokenVerifier(req, res, next) {
  const token = req.cookies.access_token;
  if (!isVerified(token)) {
    return Error(res, 401, Messages.NOT_LOGGED_IN);
  }
  next();
}