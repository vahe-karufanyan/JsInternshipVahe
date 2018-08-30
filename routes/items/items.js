



import express from 'express';
import {_getAll, _getById, _update, _addItem, _remove} from './items.controller'


const router = express.Router();

router.get('/', _getAll);

router.get('/:id', _getById);

router.put('/:id', _update);

router.post('/', _addItem);

router.delete('/:id', _remove);

export default router;