const musicController = {
  getAllMusic: (req, res) => {
    // const user = req.user.toJSON()
    res.render('all-music', { user: res.locals.user })
  }
}

module.exports = musicController
