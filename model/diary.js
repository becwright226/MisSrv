const { DataTypes } = require('sequelize');
const db = require('../db')

const DiaryModel = db.define('diary', {
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
  empId: {
    type: DataTypes.INTEGER,
    //association?
  }
});

module.exports = DiaryModel