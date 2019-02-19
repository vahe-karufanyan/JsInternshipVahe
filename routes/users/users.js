import express from 'express';
import { getAll,
  resetAll,
  // getByEmail, 
  reset } from './users.controller';


const router = express.Router();

router.get('/', getAll);

router.put('/:email', reset);

router.post('/', resetAll);

// router.get('/:id', getByEmail);

export default router;