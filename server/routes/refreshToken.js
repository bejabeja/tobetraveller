import { Router } from 'express';
import { generateAccessToken } from '../auth/generateTokens.js';
import getTokenFromHeader from '../auth/getTokenFromHeader.js';
import { verifyRefreshTokens } from '../auth/verifyTokens.js';
import { jsonResponse } from '../lib/jsonResponse.js';
import client from './database.js';

const router = Router();

router.post('/', async (req, res) => {
    const refreshToken = getTokenFromHeader(req.headers)
    if (refreshToken) {
        try {
            const foundToken = await client.query('SELECT * FROM tokens WHERE refresh_token=$1', [refreshToken])
            if (foundToken.rows.length === 0) {
                return res
                    .status(401)
                    .send(jsonResponse(401, { error: 'Unauthorized' }))
            }
            const payload = verifyRefreshTokens(foundToken.rows[0].refresh_token)
            if (payload) {
                const accessToken = generateAccessToken(payload.user)
                return res
                    .status(200)
                    .json(200, { accessToken })
            } else {
                return res
                    .status(401)
                    .send(jsonResponse(401, { error: 'Unauthorized' }))
            }
        } catch (error) {
            return res
                .status(401)
                .send(jsonResponse(401, { error: 'Unauthorized' }))
        }
    } else {
        return res
            .status(401)
            .send(jsonResponse(401, { error: 'Unauthorized' }))
    }
})

export default router;