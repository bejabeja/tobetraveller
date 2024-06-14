function getTokenFromHeader(headers) {
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

export default getTokenFromHeader;