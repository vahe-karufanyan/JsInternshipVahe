import express from 'express';
import {
  getAll,
  getById,
  update,
  addItem,
  remove,
} from './items.controller';
import IsLoggedIn from '../../helpers/isLoggedIn';


const router = express.Router();

router.get('/', IsLoggedIn, getAll);

router.get('/:id', IsLoggedIn, getById);

router.put('/:id', IsLoggedIn, update);

router.post('/', IsLoggedIn, addItem);

router.delete('/:id', IsLoggedIn, remove);

export default router;