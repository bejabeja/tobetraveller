import bcrypt from 'bcrypt';
import { setToken } from '../repositories/authRepository.js';
import { getUserByUsername } from '../repositories/userRepository.js';
import { FIELDS_REQUIRED, USER_NOT_FOUND } from '../utils/constantsErrors.js';
import { jsonResponse } from '../utils/jsonResponse.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens.js';

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