// panggil module crypto js nya
const CryptoJS = require('crypto-js')
// panggil JWT nya
const JWT = require('jsonwebtoken')
// panggil user model nya
const { superAdminModel } = require('../models/SuperAdminModel')

class JwtMainController {
  static getRegisterPage(req, res) {
    res.render('register', { wrong: false })
  }

  static showLoginPage(req, res) {
    res.render('login', { wrong: false })
  }

  static async postRegisterPage(req, res) {
    try {
      const data = req.body
      const username = data.username
      const password = data.password
      const confirm_password = data.confirm_password
      // Validasi input password
      if (password !== confirm_password) {
        return res.render('register', { wrong: true })
      }
      // hash password
      const hashedPassword = CryptoJS.HmacSHA256(password, process.env.SECRET_LOGIN).toString()
      // insert username & password to db
      await superAdminModel.insertData(username, hashedPassword)

      res.redirect('/login')
    } catch (error) {
      console.log(error)
      res.render('error', { error, message: 'DATABASE ERROR' })
    }
  }

  static async postLoginPage(req, res) {
    const data = req.body
    const username = data.username
    const password = data.password
    // ambil data usernya
    let superAdminData = await superAdminModel.getData(username)
    // handle data user yang tidak ada
    if (superAdminData === null) {
      return res.render('login', { wrong: true })
    }
    // bandingkan passwordnya
    const hashedPassword = CryptoJS.HmacSHA256(password, process.env.SECRET_LOGIN).toString()
    if (hashedPassword !== superAdminData.password) {
      return res.render('login', { wrong: true })
    }
    // bikin token untuk otorisasi user
    const token = JWT.sign({ username, id: superAdminData.id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 })
    res.redirect('/dashboard')
  }

  static async HomePage(req, res) {
    res.render('index', { title: 'HOMEPAGE' });
  }

  static getDashboardPage(req, res) {
    const decodedToken = JWT.decode(req.cookies.token)
    res.render('dashboard', { username: decodedToken.username })
  }

  static logout(req, res) {
    res.clearCookie('token')
    res.redirect('/login')
  }
}

module.exports = { JwtMainController }