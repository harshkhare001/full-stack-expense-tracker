const path = require('path');
const Expense = require('../models/expense');

exports.getHomePage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, "../", "public", "views", "index.html"))
}

exports.getExpenses = (req,res,next)=>{
    Expense.findAll({ where: { userId: req.user.id } })
    .then((expenses)=>{
        res.json(expenses);
    })
    .catch((err)=>console.log((err)));
}

exports.addExpense = (req,res,next)=>{
    const name = req.body.name;
    const amount = req.body.amount;
    const expense = req.body.expense;
    Expense.create({
        name:name,
        amount:amount,
        expense:expense,
        userId: req.user.id
    })
    .then((result)=>
    {
        console.log('expense added');
        res.redirect('/expense');
    })
    .catch((err)=>console.log(err));
}

exports.deleteExpense = (req,res,next)=>{
    const Expenseid = req.params.id;
    Expense.findByPk(Expenseid)
    .then((expense)=>{
        return expense.destroy();
    })
    .then((result)=>{
        console.log('deleted');
        res.redirect('/expense');
    })
    .catch((err)=>console.log(err));
}
