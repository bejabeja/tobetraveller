import express from 'express';
import { getAllCities, getCity } from '../controllers/cities.controller.js';

const router = express.Router();

router.get('/', getAllCities);

router.get('/:id', getCity)

export default router;