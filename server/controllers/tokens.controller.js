import { INTERNAL_SERVER_ERROR } from '../utils/constantsErrors.js';
import { jsonResponse } from '../utils/jsonResponse.js';
import { generateAccessToken, getTokenFromHeader, verifyRefreshTokens } from '../utils/tokens.js';

export default class TokensController {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async refreshTokens(req, res) {
        const refreshToken = getTokenFromHeader(req.headers)

        if (!refreshToken) {
            return res.status(401).json(jsonResponse(401, { error: 'Unauthorized: No token provided' }));
        }

        try {
            const foundToken = await this.authRepository.getAllTokensBy(refreshToken);

            if (!foundToken) {
                return res.status(401).json(jsonResponse(401, { message: 'Unauthorized: Token not found' }));
            }

            const payload = verifyRefreshTokens(foundToken.refresh_token);

            if (!payload) {
                return res.status(401).json(jsonResponse(401, { message: 'Unauthorized: Invalid token' }));
            }

            const accessToken = generateAccessToken(payload.user);

            return res.status(200).json(jsonResponse(200, { accessToken }));
        } catch (error) {
            console.error('Error verifying token:', error);
            return res.status(500).json(jsonResponse(500, { message: INTERNAL_SERVER_ERROR }));
        }
    }
}


