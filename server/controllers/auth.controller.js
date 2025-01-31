import { FIELDS_REQUIRED, INTERNAL_SERVER_ERROR } from '../utils/constantsErrors.js';
import { jsonResponse } from '../utils/jsonResponse.js';
import { getTokenFromHeader } from '../utils/tokens.js';

export default class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async signup(req, res) {
        try {
            const { username, email, password } = req.body;
            if (!username || !email || !password) {
                return res.status(400).json(jsonResponse(400, { message: FIELDS_REQUIRED }));
            }

            await this.authService.signup(username, email, password);
            return res.status(201).json(jsonResponse(201, { message: 'User successfully created' }));
        } catch (error) {
            console.error('Error creating user:', error);

            return res.status(500).json(jsonResponse(500, { error: error.message || INTERNAL_SERVER_ERROR }));
        }
    }



    async login(req, res) {
        console.log('login');
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json(jsonResponse(400, { error: FIELDS_REQUIRED }));
            }

            const loginData = await this.authService.login(username, password);

            return res.status(200).json(jsonResponse(200, loginData));
        } catch (error) {
            console.error('Login error:', error);
            return res.status(500).json(jsonResponse(500, { error: error.message || INTERNAL_SERVER_ERROR }));
        }
    }



    async logout(req, res) {
        try {
            const refreshToken = getTokenFromHeader(req.headers);

            await this.authService.logout(refreshToken);
            return res.status(200).json(jsonResponse(200, { message: 'Token deleted' }));
        } catch (error) {
            console.error('Logout error:', error);
            return res.status(500).json(jsonResponse(500, { error: error.message || INTERNAL_SERVER_ERROR }));
        }
    }
}
