const express = require('express');
const sequelize = require('./util/database');

const bodyParser = require('body-parser');

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/orders');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const expenseRoute = require('./routes/expense');
const userRoute = require('./routes/user');
const purchaseRoute = require('./routes/purchase');

app.use(expenseRoute);
app.use(userRoute);
app.use(purchaseRoute);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync().then((result)=>app.listen(3000)).catch((err)=>console.log(err));
