const express = require('express');

const router = express.Router();

const expressController = require('../controller/expense');

router.use(express.static("public"));

router.get('/',expressController.getHomePage);

router.get('/expenses', expressController.getExpenses);

router.post('/addExpense', expressController.addExpense);

router.get('/deleteExpense/:id',expressController.deleteExpense);

module.exports = router;
