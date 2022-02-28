const { DataTypes } = require('sequelize');
const db = require('../db')

const PostModel = db.define('post', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  content: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(),
    //association?
  }
});

module.exports = PostModel