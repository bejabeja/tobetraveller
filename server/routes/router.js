const express = require('express');
const router = express.Router();
const { jsonResponse } = require('../lib/jsonResponse');
const bcrypt = require('bcrypt');
const client = require('./database');
const { generateAccesToken, generateRefreshToken } = require('../auth/generateTokens');


router.post('/signup', async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || !name || !password) {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: "Fields are required" }
            )
        );
    }

    const existingUser = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: 'User name already exist' }
            )
        )
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.query('INSERT INTO users (name, username, password) VALUES ($1, $2, $3)', [name, username, hashedPassword]);
        return res.status(200).json(
            jsonResponse(
                200,
                { message: 'User successfully created' }
            )
        );
    } catch (error) {
        console.error('Error executing PostgreSQL query:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

});

async function refreshTokenS(user) {
    const refreshTokenS = generateRefreshToken(user);
    try {
        await client.query('INSERT INTO tokens (refresh_token) VALUES ($1)', [refreshTokenS]);
        return refreshTokenS;
    } catch (error) {
        console.log(error)
    }

}

router.post('/login', async (req, res) => {
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



router.get('/user', (req, res) => {
    res.send('Hello world');
});

router.get('/refresh-token', (req, res) => {
    res.send('Hello world');
});

router.get('/signout', (req, res) => {
    res.send('Hello world');
});


router.get('/places', (req, res) => {
    const placesData =
        [
            {
                "id": 1,
                "cityName": 'Gold Coast',
                "countryName": 'Australia',
                "countryCode": 'au',
                "countryText": 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
            },
            {
                "id": 2,
                "cityName": 'Barcelona',
                "countryName": 'Spain',
                "countryCode": 'es',
                "countryText": 'Lorem Ipsum  '
            },
            {
                "id": 3,
                "cityName": 'Sidney',
                "countryName": 'Australia',
                "countryCode": 'au',
                "countryText": 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
            },
            {
                "id": 4,
                "cityName": 'Zurich',
                "countryName": 'Switzerland',
                "countryCode": 'ch',
                "countryText": 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
            }
        ]

    res.send(placesData)
})

module.exports = router