const musicController = {
  getAllMusic: (req, res) => {
    res.render('all-music', { user: req.user })
  }
}

module.exports = musicController
