const { Song } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')

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
  },

  createSong: (req, res, next) => {
    return res.render('admin/create-song')
  },

  postSong: (req, res, next) => {
    const { title, album, artist, releaseYear } = req.body
    if (!title) throw new Error('Song title is required!')

    const { file } = req
    localFileHandler(file)
      .then(filePath =>
        Song.create({
          title,
          album,
          artist,
          releaseYear,
          image: filePath || null
        })
      )

      .then(() => {
        req.flash('success_messages', 'the song was successfully created')
        // req.flash('success_messages', '成功登入！')
        // console.log('Flash message:', req.flash('success_messages'))
        res.redirect('/admin/music')
      })

      .catch(err => next(err))
  },

  getSong: (req, res, next) => {
    Song.findByPk(req.params.id, {
      raw: true
    })

      .then(song => {
        if (!song) { throw new Error("The song doesn't exist!") }
        res.render('admin/song', { user: res.locals.user, song })
      })

      .catch(err => next(err))
  },

  editSong: (req, res, next) => {
    Song.findByPk(req.params.id, {
      raw: true
    })

      .then(song => {
        if (!song) { throw new Error("The song doesn't exist!") }
        res.render('admin/edit-song', { user: res.locals.user, song })
      })
  },

  putSong: (req, res, next) => {
    const { title, album, artist, releaseYear } = req.body
    if (!title) throw new Error('Song title is required!')

    const { file } = req
    Promise.all([
      Song.findByPk(req.params.id),
      localFileHandler(file)
    ])

      .then(([song, filePath]) => {
        if (!song) throw new Error("The song doesn't exist!")

        return song.update({
          title,
          album,
          artist,
          releaseYear,
          image: filePath || song.image
        })
      })
    // Song.findByPk(req.params.id)
    //   .then(song => {
    //     if (!song) throw new Error("The song doesn't exist!")
    //     return song.update({
    //       title,
    //       album,
    //       artist,
    //       releaseYear
    //     })
    //   })

      .then(() => {
        req.flash('success_messages', 'the song was successfully updated')
        res.redirect('/admin/music')
      })

      .catch(err => next(err))
  },

  deleteSong: (req, res, next) => {
    Song.findByPk(req.params.id)
      .then(song => {
        if (!song) throw new Error("The song doesn't exist!")
        return song.destroy()
      })

      .then(() => {
        req.flash('success_messages', 'the song was successfully deleted')
        res
          .redirect('/admin/music')
      })
      .catch(err => next(err))
  }
}

module.exports = adminController
