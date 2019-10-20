const model = require('../models/user')
const helper = require('../helpers/helper')
const jwt = require('jsonwebtoken')

module.exports = {
    register: (req, res) => {
        const salt = helper.generateSalt(18)
        const passwordHash = helper.setPassword(req.body.password, salt)

        const data = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: passwordHash.passwordHash, //2 kali ya? kenapa?
            salt: passwordHash.salt,
            token: 'Test',
            created_at: new Date()
        }

        model.register(data)
            .then((result) => {
                helper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },

    login: (req, res) => {
        const email = req.body.email
        const password = req.body.password

        model.getByEmail(email)
            .then((result) => {
                console.log('emailnya ada')
                const dataUser = result[0]
                const userPassword = helper.setPassword(password, dataUser.salt).passwordHash

                if (userPassword === dataUser.password) {
                    console.log('password benar domng')
                    dataUser.token = jwt.sign({
                        id: dataUser.id
                    }, process.env.SECRET_KEY || "BIMA", { expiresIn: '8h' })

                    delete dataUser.salt
                    delete dataUser.password
                    model.updateToken(email, dataUser.token)
                        .then((result) => {

                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    return helper.response(res, dataUser, 200)
                } else {
                    console.log('password salah');
                    
                    return helper.response(res, null, 403, 'Wrong Password')
                }

            })
            .catch((error) => {
                console.log(error)
            })
    },
    logout: (req, res) => {
        const userid = req.params.userid
        console.log('id dari bacnkend log out ', userid)
        model.logout(userid)
        .then((resultUser) => {
            console.log('berhasil log out dari id '. userid)
            const result = resultUser[0]
            helper.response(res, result, 200)
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
