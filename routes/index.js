const express = require('express')
const router = express.Router()

const musicController = require('../controllers/music-controller')

router.get('/music', musicController.getAllMusic)

// router.use為路由加上middleware。若上面路由都未符合，就redirect到/music
router.use('/', (req, res) => {
  res.redirect('/music')
})

module.exports = router
