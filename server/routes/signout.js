const router = require('express').Router()
const getTokenFromHeader = require('../auth/getTokenFromHeader');
const { jsonResponse } = require('../lib/jsonResponse');
const client = require('./database');


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

module.exports = router  