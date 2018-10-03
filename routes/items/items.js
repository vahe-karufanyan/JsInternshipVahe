import express from 'express';
import {_getAll, _getById, _update, _addItem, _remove, _counter} from './items.controller';
import IsLoggedIn from '../../helpers/isLoggedIn'


const router = express.Router();

router.get('/', IsLoggedIn, _getAll);

router.get('/:id', IsLoggedIn, _getById);

router.put('/:id', IsLoggedIn, _update);

router.post('/', IsLoggedIn, _addItem);

router.delete('/:id', IsLoggedIn, _remove);

export default router;