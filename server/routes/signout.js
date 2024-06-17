import { Router } from 'express';
import getTokenFromHeader from '../auth/getTokenFromHeader.js';
import { jsonResponse } from '../lib/jsonResponse.js';
import client from '../config/database.js';

const router = Router();

router.delete('/', async (req, res) => {
    try {
        const refreshToken = getTokenFromHeader(req.headers)
        if (refreshToken) {
            await client.query('DELETE FROM tokens WHERE refresh_token = $1', [refreshToken])
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