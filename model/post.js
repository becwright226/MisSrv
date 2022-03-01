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
    type: DataTypes.STRING(),
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
  }
});

module.exports = PostModel