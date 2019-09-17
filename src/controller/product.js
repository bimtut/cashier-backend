const model = require('../models/product')
const helper = require('../helpers/helper')


module.exports = {
    getAll : (req, res) => {
        model.getAll()
        .then((result) => {
            helper.response(res, result, 200)
        })
        .catch((error) => {
            console.log(error)
        })
    },

    postProduct: (req, res) => {
        const data = {
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            created_at: new Date(),
        }

        model.postProduct(data)
        .then((result) => {
            helper.response(res, result, 200)
        }) 
        .catch((error) => {
            console.log(error)
        })
    }
}