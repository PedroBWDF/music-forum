const { Genre } = require('../models')

const genreController = {
  getGenres: (req, res, next) => {
    return Genre.findAll({
      raw: true
    })

      .then(genres => res.render('admin/genres', { genres }))
      .catch(err => next(err))
  },

  postGenre: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('Genre name is required!')
    return Genre.create({
      name
    })

      .then(() => {
        req.flash('success_messages', `"${name}" genre is successfully created`)
        res.redirect('/admin/genres')
      })
      .catch(err => next(err))
  }
}

module.exports = genreController
