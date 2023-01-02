const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth')
const userCtrl = require('../controllers/user')

// auth
router.post('/register', authCtrl.register)
router.post('/login', authCtrl.login)

// user db
router.get('/:id', userCtrl.getOneUser)
router.delete('/:id', userCtrl.deleteUser)
router.put('/:id', userCtrl.modifyUser)

module.exports = router;