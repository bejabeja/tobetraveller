const express = require('express');
const router = express.Router();
const { jsonResponse } = require('../lib/jsonResponse');
const bcrypt = require('bcrypt');
const client = require('./database')



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
        await client.query('CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, name VARCHAR(255), username VARCHAR(255) UNIQUE, password VARCHAR(255))');
        await client.query('INSERT INTO users (name, username, password) VALUES ($1, $2, $3)', [name, username, hashedPassword]);
        // await client.query('SELECT * FROM users');
        // res.status(200).json(result.rows);
        res.json({ message: 'Data received successfully', username, name, password });

    } catch (error) {
        console.error('Error executing PostgreSQL query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: "Fields are required" }
            )
        )
    }

    const accesToken = "acces_token";
    const refreshToken = "refresh_token";
    const user = {
        id: '1',
        name: 'Mimi',
        username: 'mii'
    }


    res.status(200).json(
        jsonResponse(
            200,
            { user, accesToken, refreshToken }
        )
    )

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