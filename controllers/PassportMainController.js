const CryptoJS = require('crypto-js')
const { superAdminModel } = require('../models/SuperAdminModel')

class PassportMainController {
  static fightRoomId(req, res) {
    res.render('fight-room-id')
  }

  static getRegisterPage(req, res) {
    res.render('register', { wrong: false, registered: false })
  }

  static showLoginPage(req, res) {
    const { noUserData, invalidPassword } = req.query

    if (noUserData === true) {
      res.render('login', { noUserData: true })
    } else if (invalidPassword === true) {
      res.render('login', { invalidPassword: true })
    } else {
      res.render('login', { noUserData: true, invalidPassword: false })
    }
  }

  static getCreateRoomPage(req, res) {
    res.render('create-room', { username: req.user.username })
  }

  static async postRegisterPage(req, res) {
    try {
      const data = req.body
      const username = data.username
      const password = data.password
      const confirm_password = data.confirm_password

      // Validasi input password
      if (password !== confirm_password) {
        return res.render('register', { wrong: true, registered: false })
      }

      // Cek duplikasi data
      const superAdminData = await superAdminModel.getData(username)
      if (superAdminData !== null) {
        return res.render('register', { wrong: false, registered: true })
      }

      // Hash password
      const hashedPassword = CryptoJS.HmacSHA256(password, process.env.SECRET_LOGIN).toString()

      // Insert username & password to database
      await superAdminModel.insertData(username, hashedPassword)

      res.redirect('/login')
    } catch (error) {
      console.log(error)
      res.render('error', { error, message: 'DATABASE ERROR' })
    }
  }
}

module.exports = { PassportMainController }