const conn = require('../config/db')
module.exports = {
    newTransaction: (userId) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO transactions (userId) VALUES (?)', [userId], (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
        
    },
    getLastId: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT MAX (id) FROM transactions', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    addItem: (transactionsId, product) => {
        console.log('trans id ', transactionsId)
        const itemId = product.itemId,
            quantity = product.quantity,
            subtotal = product.subtotal
        console.log('ini object produknya ', product)

        return new Promise((resolve, reject) => {
            console.log('itemId ', itemId)
            console.log('type of item id ', typeof itemId)
            conn.query('INSERT INTO transactions_items (transactionsId, itemId, quantity, subtotal) VALUES (?,?,?,?)', [transactionsId, itemId, quantity, subtotal], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getTransaction: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT transactions.*, user.fullname as cashier FROM transactions JOIN user ON transactions.userId = user.id', [], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getTransactionsItems: (transId) => {
        return new Promise ((resolve, reject) => {
            conn.query('SELECT * FROM transactions_items WHERE transactionsId = ?', [transId], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}