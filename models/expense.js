const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define("expenses", {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: Sequelize.STRING,
      amount: Sequelize.DOUBLE,
      expense: Sequelize.STRING
});

module.exports = Expense;
