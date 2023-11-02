const express = require('express');
const sequelize = require('./util/database');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const expenseRoute = require('./routes/expense');
const userRoute = require('./routes/user');

app.use(expenseRoute);
app.use(userRoute);

sequelize.sync().then((result)=>app.listen(3000)).catch((err)=>console.log(err));
