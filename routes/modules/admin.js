const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')

router.get('/music', adminController.getAllMusic)
router.get('/', adminController.admin)

router.use('/', (req, res) => {
  res.redirect('/music')
})

module.exports = router
