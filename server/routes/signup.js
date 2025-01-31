import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import AuthRepository from '../repositories/auth.repository.js';
import AuthService from '../services/auth.service.js';

const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post('/', (req, res) => authController.signup(req, res));

export default router;