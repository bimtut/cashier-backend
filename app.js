require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port =  process.env.PORT || 8000;

const Cors = require('cors') //tak tau
const xssFilter = require('x-xss-protection') //tak tau
const logger = require('morgan') //tak tau
const route = require('./src/routes/router') //belum ada filenya

app.use(express.static(__dirname + '/src/uploads/images/')) //use untuk apa && dirname itu untuk apa
app.use(Cors())
app.use(xssFilter())
app.use(logger('dev'))

app.listen(port, () => {
    console.log(`listening to port : ${port}`)
})

app.use(bodyParser.json()) //kenapa pake ini sih
app.use(bodyParser.urlencoded({extended: false})) //kenapa pake ini sih
app.use('/', route)