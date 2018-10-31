import {
  isVerified,
} from './JWT';
import Error from './error';

export default function tokenVerifier(req, res, next) {
  const token = req.cookies.access_token;
  if (!isVerified(token)) {
    return Error(res, 401, 'You are not logged in');
  }
  next();
}