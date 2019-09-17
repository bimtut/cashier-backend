const conn = require('../config/db')
module.exports = {
    // get all products
    getAll: () => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM product`, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    // post a product
    postProduct: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO product SET ?`, data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}