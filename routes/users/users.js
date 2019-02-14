import express from 'express';
import { getAll, getByEmail, reset } from './users.controller';


const router = express.Router();

router.get('/', getAll);

router.put('/', reset);

router.get('/:id', getByEmail);

export default router;