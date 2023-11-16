const express = require('express');

const router = express.Router();

const expressController = require('../controller/expense');
const userAuthenticator = require('../middleware/auth');

router.use(express.static("public"));

router.get('/expense',expressController.getHomePage);

router.get('/expenses', userAuthenticator.authenticate, expressController.getExpenses);

router.post('/addExpense', userAuthenticator.authenticate, expressController.addExpense);

router.get('/deleteExpense/:id', expressController.deleteExpense);

module.exports = router;
