const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const downloadedContent = sequelize.define('downloadedContent', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey: true
    },
    fileUrl : Sequelize.STRING,
    
 })

 module.exports = downloadedContent;