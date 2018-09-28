import Hash from '../../authentication/hash';
import express from 'express';
import User from '../../models/users';
import Error from '../../helpers/error';

const router = express.Router();

router.post('/', (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword; 
    let newPassword;
    if (password === confirmPassword) {
        newPassword = Hash(password);
        const newUser = new User({
            id: Math.round((Math.random()+1)*100000),
            email: req.body.email,
            username: req.body.username,
            password: newPassword,
            confirmpassword: newPassword,
            token: Math.round((Math.random()+1)*100000)
        });
        newUser.save().then(result => {
            console.log(result);
            res.status(201).json({
                createdUser: result
            });
        }).catch(err => {
            console.log(err);
            Error(res, 400, err);
        });
    } else {
        Error(res, 400, 'Bad Request');
    }
});

router.put('/:id', (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmpassword; 
    let newPassword;
    if (password === confirmPassword) {
        newPassword = Hash(password);
        const updatedUser = new User({
            id: Math.round((Math.random()+1)*100000),
            email: req.body.email,
            username: req.body.username,
            password: newPassword,
            confirmpassword: newPassword
        });
    User.update({ id: id }, { $set: updatedUser }).exec().then(result => {
        console.log(result);
        res.status(200).json(updatedUser);
    }).catch(err => {
        console.log(err);
        Error(res, 404, 'User not Found');
    });
    }
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log('1');
    User.remove({ id: id }).exec().then(result => {
        console.log('2');
        res.status(200).json(result);
    }).catch(err => {
        console.log(err);
        Error(res, 400, 'Bad Request');
    });
});

export default router;