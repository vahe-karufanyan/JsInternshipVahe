import express from 'express';
import search from './search.controller';

const router = express.Router();

router.get('/:name', search);

export default router;