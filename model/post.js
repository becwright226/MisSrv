const { DataTypes } = require('sequelize');
const db = require('../db')

const PostModel = db.define('post', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  date: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  role: {
    type: DataTypes.TEXT,
  }
});

module.exports = PostModel