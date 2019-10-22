const model = require('../models/transaction')
const helper = require('../helpers/helper')

module.exports = {
    newTransaction: (req, res) => {
        const userId = req.body.userId,
            series = req.body.series,
            ppn = req.body.ppn,
            total = req.body.total

        const transactions_items = req.body.transactions_items
        
        model.newTransaction(userId, series, ppn, total)
            .then((result) => {
                helper.response(res, result, 200)

                model.getLastId()
                    .then(async lastId => {
                        lastId = lastId[0]['MAX (id)'] //id transaksi terakhir buat dimasukin ke transaction items
                        console.log('ini lastID >> ', lastId)

                        await transactions_items.map(async (product, index) => {
                            await model.addItem(lastId, product)
                                .then(resultAdd => {
                                    helper.response(res, resultAdd, 200)

                                })
                                .catch((error) => {
                                    console.log('gagal di add item >> ', error)

                                })
                        })
                    })
                    .catch((error) => {
                        console.log('di get last ID nya gagal >> ', error)
                    })
            })
            .catch((error) => {
                console.log('error ddari new transaction >> ', error)
            })
    },
    addItem: (req, res) => {
        const transactionId = req.body.transactionId
        const products = req.body.products

        model.addItem(transactionId, products)
            .then((result) => {
                helper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })


    },
    getTransaction: async (req, res) => {
        let data = []
        await model.getTransaction()
            .then(async (result) => {
                data = result
            })

            .catch((error) => {
                console.log('yahhh ', error)
            })

        await data.map((transaction, index) => {
            console.log('ini trans ke ', transaction.id)
            model.getTransactionsItems(transaction.id)
                .then(result => {

                    data[index] = {
                        ...transaction,
                        transactionitems: result
                    }
                    console.log(data[index])
                    if (index == data.length - 1) {
                        helper.response(res, data, 200)

                    }
                })
                .catch(err => {
                    res.json(err);
                });
        })
        
    },
    getTransItem: (req, res) => {
        const transactionId = req.body.transactionId
        model.getTransactionsItems(transactionId)
            .then((result) => {
                console.log(result)
                // data = result
                helper.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}