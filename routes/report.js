const express = require('express');

const router = express.Router();

const expressController = require('../controller/report');
const userAuthenticator = require('../middleware/auth');

router.use(express.static("public"));

router.get('/expensereport', expressController.getReportPage);

router.get('/getexpenses', userAuthenticator.authenticate, expressController.getMonthlyExpenses);

router.get('/download', userAuthenticator.authenticate, expressController.downloadExpense);

module.exports = router;