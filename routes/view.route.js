const router = require('express').Router()
const { homePage, signupPage,loginPage,panelPage, forgetPassworPage } = require('../controller/view.controller')

router.get('/',homePage )
router.get('/signup',signupPage )
router.get('/login',loginPage )
router.get('/user-panel',panelPage )
router.get('/forget-password', forgetPassworPage )

module.exports = router