const router = require('express').Router();
const { generateAccessToken } = require('../auth/generateTokens');
const getTokenFromHeader = require('../auth/getTokenFromHeader');
const { verifyRefreshTokens } = require('../auth/verifyTokens');
const { jsonResponse } = require('../lib/jsonResponse');
const client = require('./database');


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

module.exports = router