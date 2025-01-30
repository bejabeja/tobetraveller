import { Router } from 'express';
import { refreshTokens } from '../controllers/tokens.controller.js';

const router = Router();

router.post('/', refreshTokens);


export default router;