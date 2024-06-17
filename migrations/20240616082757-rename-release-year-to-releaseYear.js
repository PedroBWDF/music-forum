'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Songs', 'release_year', 'releaseYear')
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Songs', 'releaseYear', 'release_year')
  }
}
