
const express = require('express')
const { submitContactForm } = require('../controllers/emailController')
const router = express.Router()

router.post('/submit', submitContactForm)

module.exports = router;

