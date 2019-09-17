const crypto = require('crypto')

// adalah fungsi2 yang nanti akan dipakai berulang2
module.exports = {
    response: (res, result, status, error) => {
        let resultPrint = {}
        // bikin object resultPrint punya isi sebagai berikut
        resultPrint.error = error || null
        resultPrint.status_code = status || 200
        resultPrint.result = result

        return res.status(resultPrint.status_code).json(resultPrint)
    },
    generateSalt: (length) => {
        return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
    },

    setPassword: (password, salt) => {
        let hash = crypto.createHmac('sha512', salt)
        hash.update(password)
        let value = hash.digest('hex')
        return {
            salt: salt,
            passwordHash: value
        }
    }
}