const express = require('express')
const accountCtrl = require('../controllers/account.controller')

const router = express.Router();

router.route('/createUser')
    .post(accountCtrl.createUser)
router.route('/login')
    .post(accountCtrl.login)
router.route('/changePassword')
    .post(accountCtrl.changePassword)

module.exports = router;
