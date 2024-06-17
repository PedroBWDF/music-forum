'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Song.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    genre: DataTypes.STRING,
    album: DataTypes.STRING,
    // release_year: DataTypes.STRING
    releaseYear: {
      type: DataTypes.STRING,
      field: 'release_year'
    },
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
    tableName: 'Songs',
    underscored: true
  })
  return Song
}
