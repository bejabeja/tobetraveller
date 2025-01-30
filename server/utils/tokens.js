import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

function sign(payload, isAccessToken) {
    return jwt.sign(
        payload,
        isAccessToken ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: 3600
        }
    );
}

export function generateAccessToken(user) {
    return sign({ user }, true);
}

export function generateRefreshToken(user) {
    return sign({ user }, false);
}

export function getTokenFromHeader(headers) {
    if (headers && headers.authorization) {
        const splitHeader = headers.authorization.split(' ') //separate Bearer from token
        if (splitHeader.length === 2) {
            return splitHeader[1]
        } else {
            return null
        }
    } else {
        return null
    }

}


export function verifyAccessTokens(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}


export function verifyRefreshTokens(token) {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        console.error('Error verifying refresh token:', error.message);
        return null;
    }
}