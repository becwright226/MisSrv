const { DataTypes } = require('sequelize');
const db = require('../db');

const UserModel = db.define("user", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    confirmPass: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
     role: {
      type: DataTypes.STRING(),
      allowNull: false
      //association?
    },
});


module.exports = UserModel;