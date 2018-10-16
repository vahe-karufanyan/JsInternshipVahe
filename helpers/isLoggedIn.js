import JWT from 'jsonwebtoken';
import Error from './error';
import Secret from './secret';

let tokenVerifier = function (req, res, next) {
    const token = req.cookies.access_token;
    const verified = JWT.verify(token, Secret);
    if(verified) {
        next()
    } else {
        Error(res, 401, 'You are not logged in');
    }
}

export default tokenVerifier; 