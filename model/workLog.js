const { DataTypes } = require('sequelize');
const db = require('../db')

const LogModel = db.define('log', {
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
  task: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = LogModel
