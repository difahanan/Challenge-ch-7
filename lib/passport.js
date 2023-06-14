const passport = require('passport')
const CryptoJS = require('crypto-js')
const LocalStrategy = require('passport-local').Strategy
const { superAdminModel } = require('../models/SuperAdminModel')

async function authenticate(username, password, done) {
  try {
    let superAdminData = await superAdminModel.getData(username)
    // Handle jika data user tidak ada
    if (superAdminData === null) {
      return done(null, false, { noUserData: true })
    }
    // Bandingkan password
    const hashedPassword = CryptoJS.HmacSHA256(password, process.env.SECRET_LOGIN).toString()
    if (hashedPassword !== superAdminData.password) {
      return done(null, false, { invalidPassword: true })
    }
    // Hapus password sebelum masukkan data user ke passport
    delete superAdminData.password
    return done(null, superAdminData)
  } catch (error) {
    console.log(error)
    return done(error, false, { message: error.message })
  }
}

passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, authenticate))

passport.serializeUser((superAdmin, done) => done(null, superAdmin.id))

passport.deserializeUser(async function (id, done) {
  return done(null, await superAdminModel.getDataByPk(id))
})

module.exports = passport