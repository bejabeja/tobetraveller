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
