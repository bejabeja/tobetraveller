function getTokenFromHeader(headers) {
    if (headers && headers.authorization) {
        const splitHeader = headers.authorization.split(' ') //separate Bearer from token
        if (splitHeader.length === 2) {
            return splitHeader[2]
        } else {
            return null
        }
    } else {
        return null
    }

}

module.exports = getTokenFromHeader