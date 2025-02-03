import express from 'express';
import PlannedTravelsController from '../controllers/plannedTravels.controller.js';
import PlannedTravelsRepository from '../repositories/plannedTravels.repository.js';
import PlannedTravelsService from '../services/plannedTravels.service.js';


const router = express.Router();

const plannedTravelsRepository = new PlannedTravelsRepository();
const plannedTravelsService = new PlannedTravelsService(plannedTravelsRepository);
const plannedTravelsController = new PlannedTravelsController(plannedTravelsService);

router.get('/', (req, res) => plannedTravelsController.getUserTravels(req, res))

router.post('/', (req, res) => plannedTravelsController.saveUserTravel(req, res))

export default router;