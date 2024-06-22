const { Song, Genre } = require('../models')

const musicController = {
  getAllMusic: (req, res) => {
    // const user = req.user.toJSON()
    const genreId = Number(req.query.genreId) || ''

    return Promise.all([Song.findAll({
      include: Genre,
      where: {
        ...genreId ? { genreId } : {}
      },
      nest: true,
      raw: true
    }),
    Genre.findAll({ raw: true })
    ])

      .then(([songs, genres]) => {
        // console.log('user:', res.locals.user)
        return res.render('all-music', { user: res.locals.user, songs, genres, genreId })
      })
  },

  getSong: (req, res, next) => {
    return Song.findByPk(req.params.id, {
      include: Genre,
      nest: true,
      raw: true
    })
      .then(song => {
        if (!song) { throw new Error("The song doesn't exist!") }
        console.log('user:', res.locals.user)
        return res.render('song', { user: res.locals.user, song })
      })
      .catch(err => next(err))
  }
}

module.exports = musicController
