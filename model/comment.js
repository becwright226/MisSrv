const { DataTypes } = require('sequelize');
const db = require('../db')

const CommentModel = db.define('comment', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  empId: {
    type: DataTypes.INTEGER,
    //association?
  },
  content: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    //association?
  }
});

module.exports = CommentModel