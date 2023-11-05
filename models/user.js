const sequelize = require('../util/database');
const Sequelize = require('sequelize');

const Users = sequelize.define('users',{
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        allowNull :false,
        autoIncrement : true,
    },
    name: {
        type : Sequelize.STRING,
        allowNull : false
    },
    email: {
        type : Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ispremiumuser:{
        type : Sequelize.BOOLEAN,
        defaultValue : false
    },
    totalExpense: {
        type : Sequelize.INTEGER,
        defaultValue : 0
    }
});
    
module.exports = Users;
