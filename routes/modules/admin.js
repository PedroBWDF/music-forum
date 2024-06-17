const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')

router.get('/songs/create', adminController.createSong)
router.get('/songs/:id', adminController.getSong)
router.get('/music', adminController.getAllMusic)
router.post('/songs', adminController.postSong)
// router.get('/', adminController.admin)

router.use('/', (req, res) => {
  res.redirect('/admin/music')
})

module.exports = router
