import express from 'express';
import { getFavs, removeFav, saveFav } from '../controllers/favs.controller.js';
const router = express.Router();

router.get('/', getFavs);


router.post('/', saveFav);

router.delete('/', removeFav);

export default router;