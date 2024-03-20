const jwt = require('jsonwebtoken')

function sign(payload, isAccesToken) {
    return jwt.sign(
        payload,
        isAccesToken ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: 3600
        }
    )
}

function generateAccesToken(user) {
    return sign({ user }, true)
}

function generateRefreshToken(user) {
    return sign({ user }, false)
}

module.exports = { generateAccesToken, generateRefreshToken }