import { Router } from 'express';
import TokensController from '../controllers/tokens.controller.js';
import AuthRepository from '../repositories/auth.repository.js';

const router = Router();

const authRepository = new AuthRepository();
const tokensController = new TokensController(authRepository);

router.post('/', (req, res) => {
    tokensController.refreshTokens(req, res);
});


export default router;