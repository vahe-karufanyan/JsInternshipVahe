import express from 'express';
import _search from './search.controller';

const router = express.Router();

router.get('/:name', _search);

export default router;