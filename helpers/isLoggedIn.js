import JWT from 'jsonwebtoken';
import Error from './error';

export default function tokenVerifier(req, res, next) {
  const token = req.cookies.access_token;
  const verified = JWT.verify(token, 'JimCarrey');
  if (!verified) {
    return Error(res, 401, 'You are not logged in');
  }
  next();
}