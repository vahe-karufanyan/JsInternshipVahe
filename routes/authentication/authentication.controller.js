import JWT from 'jsonwebtoken';
import User from '../../models/userRepositery';
import Error from '../../helpers/error';
import bcrypt from 'bcrypt';

export function _signUp (req, res) {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const email = req.body.email;
    if (password === confirmPassword && email) {
        bcrypt.hash(password, 10, function(err, hash) {
            User.create({
                id: Math.round((Math.random()+1)*100000),
                email: email,
                password: hash,
            }).exec().then(result => {
                const SECRET = 'JimCarrey'
                let payload = {
                    email: email
                }
                const token = JWT.sign(payload, SECRET)
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
    } else {
        Error(res, 400, 'Bad Request');
    }
}

export function _logIn (req, res) {
    const password = req.body.password;
    const email = req.body.email;
    const currentUser = User.findOne({email: email});
    bcrypt.hash(password, 10, function(err, hash) {
        if (hash === currentUser.password && email) {
            const SECRET = 'JimCarrey'
            let payload = {
                email: email
            }
            const token = JWT.sign(payload, SECRET)
            res.cookie('access_token', token, {
                httpOnly: true,
                maxAge: 86400
            })
            res.status(201).end();       
        } else {
            Error(res, 400, 'Bad request');
        }
    })
}