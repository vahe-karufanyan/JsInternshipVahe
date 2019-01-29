import express from 'express';
import IsLoggedIn from '../../helpers/isLoggedIn';
import buy from './buy.controller';


const router = express.Router();

router.post('/', IsLoggedIn, buy);

export default router;