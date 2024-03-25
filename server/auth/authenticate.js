//class middleware
const getTokenFromHeader = require("./getTokenFromHeader")
const { verifyAccessTokens } = require("./verifyTokens")

function authenticate(req, res, next) {
    const token = getTokenFromHeader(req.headers)
    if (token) {
        const decoded = verifyAccessTokens(token)
        if (decoded) { //si esta autenticado el usuario
            req.user = { ...decoded.user }
            next()
        } else {
            return res.status(401).json(
                jsonResponse(
                    401,
                    { error: "No token provided" }
                )
            )
        }
    } else {
        return res.status(401).json(
            jsonResponse(
                401,
                { error: "No token provided" }
            )
        )
    }

}

module.exports = authenticate