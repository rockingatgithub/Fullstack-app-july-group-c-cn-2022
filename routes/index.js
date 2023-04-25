const express = require('express')
const router = express.Router()

router.use('/student', require('./student'))
router.use('/result', require('./result'))


module.exports = router