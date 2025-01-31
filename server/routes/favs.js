import express from 'express';
import FavsController from '../controllers/favs.controller.js';
import FavsRepository from '../repositories/favs.repository.js';
import FavsService from '../services/favs.service.js';
const router = express.Router();


const favsRepository = new FavsRepository();
// const userRepository = new UserRepository();
const favsService = new FavsService(favsRepository);
const favsController = new FavsController(favsService);

router.get('/', (req, res) => favsController.getFavs(req, res));

router.post('/', (req, res) => favsController.saveFav(req, res));

router.delete('/', (req, res) => favsController.removeFav(req, res));

export default router;