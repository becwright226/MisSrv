const { DataTypes } = require('sequelize');
const db = require('../db')

const RecipeModel = db.define('recipe', {
  style: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  course: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  method: {
    type:DataTypes.STRING(100),
    allowNull: true
  }
});

module.exports = RecipeModel