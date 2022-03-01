const { DataTypes } = require('sequelize');
const db = require('../db')

const CommentModel = db.define('comment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(1000),
    allowNull: false
  }
});

module.exports = CommentModel