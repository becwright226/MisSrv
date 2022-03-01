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
    type: DataTypes.DATE,
    allowNull: false
  },
  task: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = LogModel
