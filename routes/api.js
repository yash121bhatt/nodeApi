const express = require('express')

const UserController = require('../controller/UserController')

const router = express.Router()

//User Controller
router.get('/getalldata', UserController.getAllData)
router.post('/userinsert', UserController.userInsert)
router.get('**', UserController.pageNotFound)

module.exports = router