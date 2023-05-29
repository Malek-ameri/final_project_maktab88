const router = require('express').Router()
const { homePage, signupPage,loginPage,panelPage } = require('../controller/view.controller')

router.get('/',homePage )
router.get('/signup',signupPage )
router.get('/login',loginPage )
router.get('/user-panel',panelPage )

module.exports = router