const express = require('express')
const Route = express.Router()

const userController = require('../controller/user')
const productController = require('../controller/product')

Route
    .get('/product/', productController.getAll)
    .post('/product/', productController.postProduct)
    .post('/register/', userController.register)
    .post('/login', userController.login)
    .patch('/logout/:userid', userController.logout)

module.exports = Route