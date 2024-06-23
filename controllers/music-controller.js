const { Song, Genre } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const musicController = {
  getAllMusic: (req, res, next) => {
    // const user = req.user.toJSON()
    const DEFAULT_LIMIT = 12
    const genreId = Number(req.query.genreId) || ''
    const page = Number(req.query.page) || 1
    const limit = DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    return Promise.all([Song.findAndCountAll({
      include: Genre,
      where: {
        ...genreId ? { genreId } : {}
      },
      offset,
      limit,
      nest: true,
      raw: true
    }),
    Genre.findAll({ raw: true })
    ])

      .then(([songs, genres]) => {
        // console.log('user:', res.locals.user)
        console.log('songs.count:', songs.count)
        // console.log('songs.rows:', songs.rows)
        return res.render('all-music', { user: res.locals.user, songs: songs.rows, genres, genreId, pagination: getPagination(limit, page, songs.count) })
      })

      .catch(err => next(err))
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
