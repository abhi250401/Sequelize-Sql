const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database");

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
    },
});
module.exports = User;