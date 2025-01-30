import express from 'express';
import CitiesController from '../controllers/cities.controller.js';
import CitiesRepository from '../repositories/cities.repository.js';
import CitiesService from '../services/cities.service.js';

const router = express.Router();

const citiesRepository = new CitiesRepository();
const citiesService = new CitiesService(citiesRepository);
const citiesController = new CitiesController(citiesService);


router.get('/', (req, res) => citiesController.getAllCities(req, res));

router.get('/:id', (req, res) => citiesController.getCity(req, res));

export default router;