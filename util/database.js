const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker', 'harsh', 'harsh123', {dialect:'mysql', host:'database-1.ceo8uaj0yirw.ap-south-1.rds.amazonaws.com'});

module.exports = sequelize;
