import express from 'express';
import { jsonResponse } from '../utils/jsonResponse.js';
import bcrypt from 'bcrypt';
import { getUserByUsername, createNewUser } from '../repositories/userRepository.js';
import { INTERNAL_SERVER_ERROR, FIELDS_REQUIRED } from '../utils/constantsErrors.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json(
            jsonResponse(
                400,
                { message: FIELDS_REQUIRED }
            )
        );
    }

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
        return res.status(400).json(
            jsonResponse(
                400,
                { message: 'Username already exist' }
            )
        )
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        return res.status(400).json(
            jsonResponse(
                400,
                { message: "Introduce a valid email" }
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
        return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
    }

});

export default router;