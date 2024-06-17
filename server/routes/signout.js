import { Router } from 'express';
import getTokenFromHeader from '../auth/getTokenFromHeader.js';
import { jsonResponse } from '../lib/jsonResponse.js';
import { removeToken } from '../repositories/authRepository.js';

const router = Router();

router.delete('/', async (req, res) => {
    try {
        const refreshToken = getTokenFromHeader(req.headers)
        if (refreshToken) {
            await removeToken(refreshToken)
            res.status(200).json(jsonResponse(
                200,
                { message: 'Token deleted' }
            ))
        }
    } catch (error) {
        console.log(error)
    }
});

export default router;