const express = require('express')
const router = express.Router()
const adminCtrl = require('../controllers/admin')

router.post('/', adminCtrl.login);

module.exports = router;