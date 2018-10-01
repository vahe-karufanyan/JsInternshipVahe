import express from 'express';
import {_signUp, _logIn} from './authentication.controller';

const router = express.Router();


router.post('/signup', _signUp);

router.post('/login', _logIn);


export default router;