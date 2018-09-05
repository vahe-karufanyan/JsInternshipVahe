import express from 'express';
import {_getAll, _getById, _update, _addUser, _remove} from './users.controller'


const router = express.Router();

router.get('/', _getAll);

router.get('/:id', _getById);

// router.put('/:id', _update);

router.post('/', _addUser);

router.delete('/:id', _remove);

export default router;