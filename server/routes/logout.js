import { Router } from 'express';
import { logout } from '../controllers/auth.controller.js';
const router = Router();

router.delete('/', logout);

export default router;