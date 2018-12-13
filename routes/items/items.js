import express from 'express';
import { getAll, getById, update, addItem, remove } from './items.controller';
import IsLoggedIn from '../../helpers/isLoggedIn';


const router = express.Router();

router.get('/', getAll);

router.get('/:id', getById);

router.put('/:id', IsLoggedIn, update);

router.post('/', IsLoggedIn, addItem);

router.delete('/:id', IsLoggedIn, remove);

export default router;