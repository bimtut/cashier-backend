const conn = require('../config/db')
const jwr = require('jsonwebtoken')

module.exports = {
    // register
    register: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`INSERT INTO user SET ?`, data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    // login
    getByEmail: (email) => { //get data dari email yg cocok dulu.. lalu...
        return new Promise((resolve, reject) => {
            conn.query(`SELECT userid, email, fullname, created_at, salt, password FROM user WHERE email = ?`, email, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    updateToken: (email, token) => { //mengisi token
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE user SET token = ? WHERE email = ?`, [token, email], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    // -----------end of login -------------
    logout: (userid) => { //menghapus token dengan menimpanya dengan text 'test'
        const test = 'test'; //buat apanih kalo leh taw
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE user SET token = ? WHERE userid = ?`, [test, userid], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                } 
            }) 
        })
    }
}