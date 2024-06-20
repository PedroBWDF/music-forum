const { Genre } = require('../models')

const genreController = {
  getGenres: (req, res, next) => {
    return Genre.findAll({
      raw: true
    })

      .then(genres => res.render('admin/genres', { genres }))
      .catch(err => next(err))
  }
}

module.exports = genreController
