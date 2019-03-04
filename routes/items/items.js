import express from 'express';
// import multer from 'multer';
import { getAll, getById, update, addItem, remove, getImage,
  // imageChunks 
} from './items.controller';
import IsAdmin from '../../helpers/isAdmin';

// const upload = multer({ dest: 'images/' });

const router = express.Router();

router.get('/', getAll);

router.get('/getImage/:id', getImage);

router.get('/:id', getById);

router.put('/:id', IsAdmin, update);

router.post('/', IsAdmin, 
// upload.single('image'), 
  addItem);

// router.post('/imageChunks', IsAdmin, imageChunks);

router.delete('/:id', IsAdmin, remove);

export default router;