// panggil module sequelize nya
const { Sequelize } = require('sequelize')

// bikin config buat sequelize nya dan bikin variabel buat nyimpan config sequelize nya 
const sequelize = new Sequelize({
    // masukkan config nya seperti db nya dll
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'postgres'
})

// exports sequelize nya
module.exports = { sequelize }