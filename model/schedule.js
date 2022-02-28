const { DataTypes } = require('sequelize');
const db = require('../db')

const SchedModel = db.define('schedule', {
  date: {
    type: DataTypes.DATE,
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
  empId: {
    type: DataTypes.INTEGER,
    //association?
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = SchedModel