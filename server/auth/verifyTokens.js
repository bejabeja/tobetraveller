import jwt from 'jsonwebtoken'

function verifyAccessTokens(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}


function verifyRefreshTokens(token) {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        console.error('Error verifying refresh token:', error.message);
        return null;
    }
}

export { verifyAccessTokens, verifyRefreshTokens };