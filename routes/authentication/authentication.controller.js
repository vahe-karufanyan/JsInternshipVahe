import JWT from 'jsonwebtoken';
import User from '../../models/userRepositery';
import Error from '../../helpers/error';
import bcrypt from 'bcrypt';
import Secret from '../../helpers/secret'
const SECRET = 'JimCarrey';

export function _signUp (req, res) {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const email = req.body.email;
    if (password !== confirmPassword || !email) {
        Error(res, 400, 'Bad Request');
        return;
    }
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            Error(res, 400, err);
            return;
        }
        User.create({
            id: Math.round((Math.random()+1)*100000),
            email: email,
            password: hash,
        }).exec().then(result => {
            const payload = {
                email: email
            }
            const token = JWT.sign(payload, Secret)
            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 86400
            })
            res.status(201).json({
            createdUser: result
            }); 
        }).catch(err => {
            Error(res, 400, err);
        });
    })
}

export function _logIn (req, res) {
    const password = req.body.password;
    const email = req.body.email;
    if (!email) {
        Error(res, 400, 'Enter valid email')
        return;
    }
    User.findOne({email: email}).then(currentUser => {
        bcrypt.compare(password, currentUser.password, (err, result) => {
            if (err) {
            Error(res, 400, err)
            return;
            } 
            if (!result) {
                Error(res, 400, 'Password is not correct')
                return;
            }
            const payload = {
                email: email
            }
            const token = JWT.sign(payload, Secret)
            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 60*60*12
            })
            res.status(201).end();
        });
    }).catch(err => {
        Error(res, 400, err);
    });
}