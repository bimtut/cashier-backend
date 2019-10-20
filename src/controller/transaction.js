const model = require('../models/transaction')
const helper = require('../helpers/helper')

module.exports = {
    newTransaction: (req, res) => {
        const userId = req.body.userId
        const transactions_items = req.body.transactions_items
        // const transactionId = req.body.transactionId
        // const products = req.body.products

        model.newTransaction(userId)
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
        model.getTransaction()
            .then((result) => {
                data = result
                // helper.response(res, result, 200)
                // console.log(data)
                data.map((item) => {
                    // console.log('trans id ke ', item.id)
                    model.getTransactionsItems(item.id)
                    .then((result) => {
                        console.log(result)
                        // data = result
                        helper.response(res, result, 200)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
                
            })
            .catch((error) => {
                console.log(error)
            })

        // data.map((product, index) => {
        //     console.log(product.transactionId)

        //     model.getTransactionsItems(product.transactionId)
        //         .then(result => {
        //             // console.log(result)
        //             // data[index] = {
        //             //     ...product,
        //             //     transaction_items: result
        //             // }
        //             // if (index == data.length - 1) {
        //             //     helper.response(res, result, 200)

        //             //     // formResponse.success(res, 200, data)
        //             // }
        //         })
        //         .catch(err => {
        //             res.json(err);
        //         });
        // })

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