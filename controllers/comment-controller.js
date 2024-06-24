const { Comment, User, Song } = require('../models')

const commentController = {
  postComment: (req, res, next) => {
    const { songId, text } = req.body
    const userId = req.user.id
    if (!userId) throw new Error('User is required!')
    if (!text) throw new Error('Comment text is required!')

    return Promise.all([
      Song.findByPk(songId),
      User.findByPk(userId)
    ])

      .then(([song, user]) => {
        if (!song) throw new Error("The song doesn't exist!")
        if (!user) throw new Error("The user doesn't exist!")
        return Comment.create({
          text,
          songId,
          userId
        })
      })
      .then(() => {
        req.flash('success_messages', 'The comment is successfully created!')
        res.redirect(`/songs/${songId}`)
      })
      .catch(err => next(err))
  }
}

module.exports = commentController
