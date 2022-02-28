const { DataTypes } = require('sequelize');
const db = require('../db')

const OrderModel = db.define('order', {
  date: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  itemCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  isEvent: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  eventName: {
    type: DataTypes.STRING(),
    allowNull: true
  }, 
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = OrderModel