const { DataTypes } = require('sequelize');
const db = require('../db')

const LogModel = db.define('log', {
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  task: {
    type: DataTypes.STRING(100),
    allowNull: true
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

module.exports = LogModel
