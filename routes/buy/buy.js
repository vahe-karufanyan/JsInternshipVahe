import express from 'express';
import IsLoggedIn from '../../helpers/isLoggedIn';
import { buy, buyAll } from './buy.controller';


const router = express.Router();

router.post('/', IsLoggedIn, buy);

router.post('/buyAll', IsLoggedIn, buyAll);

export default router;