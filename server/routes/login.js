const express = require('express');
const router = express.Router();
const { jsonResponse } = require('../lib/jsonResponse');
const bcrypt = require('bcrypt');
const client = require('./database');
const { generateAccesToken, generateRefreshToken } = require('../auth/generateTokens');

async function refreshTokenS(user) {
    const refreshTokenS = generateRefreshToken(user);
    try {
        await client.query('INSERT INTO tokens (refresh_token) VALUES ($1)', [refreshTokenS]);
        return refreshTokenS;
    } catch (error) {
        console.log(error)
    }

}

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: "Fields are required" }
            )
        )
    }

    const findUserName = await client.query('SELECT * FROM users WHERE username=$1', [username])
    console.log(findUserName.rows[0])

    if (findUserName.rows.length > 0) {
        const user = findUserName.rows[0]
        const matchPassword = await bcrypt.compare(password, user.password)

        if (matchPassword) {
            const accesToken = generateAccesToken(user);
            const refreshToken = await refreshTokenS(user);

            res.status(200).json(
                jsonResponse(
                    200,
                    { user, accesToken, refreshToken }
                )
            )

        } else {
            return res.status(400).json(
                jsonResponse(
                    400,
                    { error: 'User or password incorrect' }
                )
            )
        }
    } else {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: 'User not found' }
            )
        )
    }
});

module.exports = router;