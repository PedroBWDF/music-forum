const { Song } = require('../models')

const adminController = {
  getAllMusic: (req, res, next) => {
    Song.findAll({
      raw: true
    })

      .then(allmusic => {
        res.render('admin/all-music', { user: res.locals.user, songs: allmusic })
      })
    // return res.render('admin/all-music', { user: res.locals.user })
      .catch(err => next(err))
  }

  // admin: (req, res) => {
  //   console.log(res.locals.user)
  //   return res.render('admin/all-music', { user: res.locals.user })
  // }
}

module.exports = adminController
