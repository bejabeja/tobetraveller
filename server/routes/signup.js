const express = require('express');
const router = express.Router();
const { jsonResponse } = require('../lib/jsonResponse');
const bcrypt = require('bcrypt');
const client = require('./database');


router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: "Fields are required" }
            )
        );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log('emailllllll')
    console.log(emailPattern)

    console.log(emailPattern.test(email))

    if (!emailPattern.test(email)) {

        console.log('im in')
        return res.status(400).json(
            jsonResponse(
                400,
                { error: "Introduce a valid email" }
            )
        );
    }

    const existingUser = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: 'Username already exist' }
            )
        )
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3)', [email, username, hashedPassword]);
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

module.exports = router;