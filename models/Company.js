const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database");

const Company = sequelize.define('company', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING
    }
});
module.exports = Company;