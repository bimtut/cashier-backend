require('dotenv').config()

const mysql = require('mysql')
const connection = mysql.createConnection({ //createConnection udah ada di library mysql
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

connection.connect((err) => {
    if (err) console.log(`Error: ${err}`)
})

module.exports = connection //kenapa pakai module.exports?