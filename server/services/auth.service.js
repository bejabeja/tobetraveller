import bcrypt from 'bcrypt';

import { createNewUser, getUserByUsername } from "../repositories/user.repository.js";
import { USER_PASSWORD_INCORRECT } from '../utils/constantsErrors.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokens.js';


export default class AuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }


    async signup(username, email, password) {

        const user = await getUserByUsername(username);
        if (user) {
            throw new Error('Username already exists');
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            throw new Error('Introduce a valid email');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await createNewUser(email, username, hashedPassword);
    }

    async login(username, password) {

        const user = await getUserByUsername(username);
        if (!user) {
            throw new Error(USER_PASSWORD_INCORRECT);
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            throw new Error(USER_PASSWORD_INCORRECT);
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = await this.refreshTokenS(user);

        return { user, accessToken, refreshToken };
    }


    async logout(refreshToken) {
        if (!refreshToken) {
            throw new Error('No token provided');
        }

        await this.authRepository.removeToken(refreshToken);
    }


    async refreshTokenS(user) {
        try {
            const refreshToken = generateRefreshToken(user);
            await this.authRepository.setToken(refreshToken);
            return refreshToken;
        } catch (error) {
            throw new Error('Could not generate refresh token');
        }
    }
}