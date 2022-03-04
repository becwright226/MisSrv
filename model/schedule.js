const { DataTypes } = require('sequelize');
const db = require('../db')

const SchedModel = db.define('schedule', {
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
  desc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  empAssign: {
    type: DataTypes.TEXT,
    allowNull: true
  
  }
});

module.exports = SchedModel