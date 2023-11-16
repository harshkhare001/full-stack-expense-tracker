const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const sequelize = require('./util/database');
require('dotenv').config();

const bodyParser = require('body-parser');

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require('./models/orders');
const ForgotPasswordRequest = require('./models/forgotpasswordrequest');
const downloadedContent = require('./models/downloadedfiles');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const expenseRoute = require('./routes/expense');
const userRoute = require('./routes/user');
const purchaseRoute = require('./routes/purchase');
const premiumRoute = require('./routes/premium');
const forgotpasswordRoute = require('./routes/forgotpassword');
const reportRoutes = require('./routes/report');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags : 'a'})

app.use(cors());
app.use(expenseRoute);
app.use(userRoute);
app.use(purchaseRoute);
app.use(premiumRoute);
app.use(forgotpasswordRoute);
app.use(reportRoutes);
app.use(helmet());
app.use(compression());
app.use(morgan('combined', {stream : accessLogStream}));

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);

User.hasMany(downloadedContent);
downloadedContent.belongsTo(User);

sequelize.sync().then((result)=>app.listen(3000)).catch((err)=>console.log(err));   
