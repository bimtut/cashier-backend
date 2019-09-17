const jwt = require('jsonwebtoken')
const helper = require('../helpers/helper')

const allowedAccess = process.env.REQUEST_HEADERS || "x-control-user"

module.exports = {
    authInfo: (req, res, next) => {
        const headerAuth = req.headers['authorization']
        const headerSecret = req.headers['x-access-token']

        if (headerAuth !== allowedAccess) {
            return DrumHelper.response(res, null, 401, 'Unauthorized, Need access token!')
        } else if (typeof headerSecret === 'undefined') {
            next() //apakah gunanya ini?
        } else {
            const bearerToken = headerSecret.split(' ')
            const token = bearerToken[1]
            req.token = token //apakah itu req.token?
            console.log('Token stored! '+ token)

            next()
        }
    },

    accessToken: (req, res, next) => {
        const secretKey = process.env.SECRET_KEY || "BIMA"
        const accessToken = req.token
        const userToken = reqHeader['x-control-user']

        jwt.verify(accessToken, secretKey, (err, decoded) => {
            if (err &&err.name === 'TokenExpiredError') {
                return DrumHelper.response(res, null, 401, 'Token expired')
            }

            if (err && err.name === 'JsonWebTokenError') {
                return DrumHelper.response(res, null, 401, 'Invalid Token')
            }
            
            if (parseInt(userToken) !== parseInt(decoded.userid)) {
                return DrumHelper.response(res, null, 401, 'Invalid User Token')
            }
            
            next()
        })
    }
}