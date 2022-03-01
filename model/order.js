const { DataTypes } = require('sequelize');
const db = require('../db')

const OrderModel = db.define('order', {
  date: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  itemCount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isEvent: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  eventName: {
    type: DataTypes.TEXT,
    allowNull: true
  }, 
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = OrderModel