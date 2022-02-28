const { DataTypes } = require('sequelize');
const db = require('../db')

const OrderModel = db.define('order', {
  date: {
    type: DataTypes.DATE,
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
  event: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = OrderModel