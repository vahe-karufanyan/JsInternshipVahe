import express from 'express';
import IsLoggedIn from '../../helpers/isLoggedIn';
import _search from './search.controller'

const router = express.Router();

router.get('/:name', IsLoggedIn, _search);

export default router;