const path = require('path');
const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');
require('dotenv').config();

exports.getHomePage = (req,res,next)=>
{
    res.sendFile(path.join(__dirname, "../", "public", "views", "index.html"))
}

exports.getExpenses = async (req,res,next)=>
{
    try
    {
        const page = +req.query.page || 1;
        const limit = +req.query.limit    || 3;
        const startIndex = (page-1)*limit;
        const totalExpenses = await Expense.count({ where: { userId: req.user.id }});
        const expenses = await Expense.findAll({ where: { userId: req.user.id }, offset : startIndex, limit : limit })
        res.json({
            expense : expenses,
            currentPage : page,
            hasNextPage : limit * page < totalExpenses,
            nextPage : page + +1,
            hasPreviousPage : page > 1,
            previousPage : page-1,
            lastPage : Math.ceil(totalExpenses/limit)
        });
    }
    catch(err)
    {
        console.log(err);
    }
}

exports.addExpense = async (req, res, next)=>
{
    const t = await sequelize.transaction();
    const name = req.body.name;
    const amount = req.body.amount;
    const expense = req.body.expense;
    try{
        await Expense.create({
            name:name,
            amount:amount,
            expense:expense,
            userId: req.user.id
        },{ transaction: t })

        await req.user.update(
            {totalExpense: req.user.totalExpense+ +amount},{ transaction: t }
        )
        
        await t.commit();
        console.log('expense added');
        res.redirect('/expense');
    }
    catch(err)
    {
        console.log(err);
        await t.rollback();
    }
}

exports.deleteExpense = (req, res, next)=>
{
    const Expenseid = req.params.id;
    Expense.findByPk(Expenseid)
    .then((data)=>
    {
        User.findByPk(data.userId)
        .then((user) => 
        {
            user.update({ totalExpense: user.totalExpense - +data.amount });
        });
        return data.destroy();
    })
    .then((result)=>
    {
        console.log('deleted');
        res.redirect('/expense');
    })
    .catch((err)=>console.log(err));
}
