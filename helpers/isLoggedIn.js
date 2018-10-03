import JWT from 'jsonwebtoken';
import Error from './error'

let tokenVerifier = function (req, res, next) {
    const token = req.cookies.access_token;
    const verified = JWT.verify(token, SECRET);
    if(verified) {
        next()
    } else {
        Error(res, 400, 'No Token');
    }
}

export default tokenVerifier; 