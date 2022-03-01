const { DataTypes } = require('sequelize');
const db = require('../db')

const DiaryModel = db.define('diary', {
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
  title: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  content: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
});

module.exports = DiaryModel