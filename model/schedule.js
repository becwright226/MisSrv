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
    type: DataTypes.STRING(),
    allowNull: false
  },
  task: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  desc: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  empAssign: {
    type: DataTypes.INTEGER,
  
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = SchedModel