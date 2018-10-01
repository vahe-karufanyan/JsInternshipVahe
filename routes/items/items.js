import express from 'express';
import {_getAll, _getById, _update, _addItem, _remove, _counter} from './items.controller';
import TokenVerifier from '../../helpers/tokenVerifier'


const router = express.Router();

router.get('/', TokenVerifier(), _getAll);

router.get('/:id', TokenVerifier(), _getById);

router.put('/:id', TokenVerifier(), _update);

router.post('/', TokenVerifier(), _addItem);

router.delete('/:id', TokenVerifier(), _remove);

export default router;