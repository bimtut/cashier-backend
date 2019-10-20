const express = require('express')
const Route = express.Router()

const userController = require('../controller/user')
const productController = require('../controller/product')
const transactionController = require('../controller/transaction')

Route
    .get('/product/', productController.getAll)
    .post('/product/', productController.postProduct)
    .post('/register/', userController.register)
    .post('/login', userController.login)
    .patch('/logout/:userid', userController.logout)
    .post('/transaction/', transactionController.newTransaction)
    .post('/transaction/addItem', transactionController.addItem)
    .get('/transaction/', transactionController.getTransaction)
    .get('/transaction/item/', transactionController.getTransItem)

module.exports = Route