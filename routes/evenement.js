const express = require('express')
const router = express.Router()
const evenementCtrl = require('../controllers/evenement')

// route Event
router.get('/', evenementCtrl.readEvent)
router.post('/', evenementCtrl.addEvent)
router.put('/:id', evenementCtrl.modifyEvent)
router.delete('/:id', evenementCtrl.deleteEvent)
router.post('/:id/joinEvent', evenementCtrl.joinEvent)
router.post('/:id/leaveEvent', evenementCtrl.leaveEvent)
// router.post('/:id/chatEvent', evenementCtrl.chatEvent)


module.exports = router