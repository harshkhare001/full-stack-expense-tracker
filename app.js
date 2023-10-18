const express = require('express');
const sequelize = require('./util/database');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const expenseRoute = require('./routes/expense');

app.use(expenseRoute);

sequelize.sync().then((result)=>app.listen(3000)).catch((err)=>console.log(err));