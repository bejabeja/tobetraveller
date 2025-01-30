import express from 'express';

import { getUserTravels, saveUserTravel } from '../controllers/userTravels.controller.js';

const router = express.Router();

router.get('/', getUserTravels)

router.post('/', saveUserTravel)

export default router;