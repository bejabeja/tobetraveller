import bcrypt from 'bcrypt';
import { removeToken, setToken } from '../repositories/auth.repository.js';
import { createNewUser, getUserByUsername } from '../repositories/user.repository.js';
import { FIELDS_REQUIRED, INTERNAL_SERVER_ERROR, USER_NOT_FOUND } from '../utils/constantsErrors.js';
import { jsonResponse } from '../utils/jsonResponse.js';
import { generateAccessToken, generateRefreshToken, getTokenFromHeader } from '../utils/tokens.js';

async function refreshTokenS(user) {
    const refreshTokenS = generateRefreshToken(user);
    try {
        await setToken(refreshTokenS);
        return refreshTokenS;
    } catch (error) {
        console.log(error)
    }

}
export const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json(
            jsonResponse(
                400,
                { error: FIELDS_REQUIRED }
            )
        )
    }

    const user = await getUserByUsername(username)

    if (user) {
        const matchPassword = await bcrypt.compare(password, user.password)

        if (matchPassword) {
            const accesToken = generateAccessToken(user);
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
                { error: USER_NOT_FOUND }
            )
        )
    }
}

export const signup = async (req, res) => {
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
}


export const logout = async (req, res) => {
    try {
        const refreshToken = getTokenFromHeader(req.headers)
        if (refreshToken) {
            await removeToken(refreshToken)
            res.status(200).json(jsonResponse(
                200,
                { message: 'Token deleted' }
            ))
        }
    } catch (error) {
        console.log(error)
    }
}