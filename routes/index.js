var express = require('express');
var router = express.Router();
var passport = require('../lib/passport')

const { JwtMainController } = require('../controllers/JwtMainController')
const { JwtAuthorizationCheck } = require('../lib/JwtAuthorizationCheck')

const { PassportMainController } = require('../controllers/PassportMainController')
const { PassportAuthorizationCheck } = require('../lib/PassportAuthorizationCheck')

/* GET home Page. */
router.get('/', JwtMainController.HomePage)

/* Register Page */
router.get('/register', PassportMainController.getRegisterPage)
router.post('/register', PassportMainController.postRegisterPage)

/* Login Page */
router.get('/login', PassportMainController.showLoginPage)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/create-room',
    failureRedirect: '/login',
    failureFlash: true
}))

/* Fight Room */
router.post('/fight-room-id', PassportMainController.fightRoomId)

/* Create Room */
router.get('/create-room', PassportAuthorizationCheck, PassportMainController.getCreateRoomPage)


module.exports = router;