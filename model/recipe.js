const { DataTypes } = require('sequelize');
const db = require('../db')

const RecipeModel = db.define('recipe', {
  style: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  course: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  method: {
    type:DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = RecipeModel