const jwt = require('jsonwebtoken')

function verifyAccessTokens(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}


function verifyRefreshTokens(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
}

module.exports = { verifyAccessTokens, verifyRefreshTokens }