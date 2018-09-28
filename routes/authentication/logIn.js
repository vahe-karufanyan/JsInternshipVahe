import Compair from '../../authentication/compare';
import express from 'express';
import User from '../../models/users';
import Error from '../../helpers/error';
import Hash from '../../authentication/hash';

const router = express.Router();

router.post('/', (req, res) => {
    const password = req.body.password;
    const username = req.params.username;
    const token = req.params.token;
    const confirmPassword = User.findOne({username: username});
    if (Hash(password) === confirmPassword.password && username && token) {
        return true;        
    } else {
        Error(res, 400, 'Bad request');
    }
});

export default router;