import express from 'express';
import { getAll, getByEmail } from './users.controller';


const router = express.Router();

router.get('/', getAll);

router.get('/:id', getByEmail);

export default router;