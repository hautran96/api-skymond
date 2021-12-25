const express = require('express')
const accountRoutes = require('./account.routes')
const router = express.Router()

router.use('/auth', accountRoutes)

module.exports = router;