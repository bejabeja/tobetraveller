import express from 'express';
import { jsonResponse } from '../lib/jsonResponse.js';
import bcrypt from 'bcrypt';
import client from '../config/database.js';
import { getUserByUsername, createNewUser } from '../repositories/userRepository.js';

const router = express.Router();

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

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: 'Username already exist' }
            )
        )
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: "Introduce a valid email" }
            )
        );
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await createNewUser(email, username, hashedPassword)
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

export default router;