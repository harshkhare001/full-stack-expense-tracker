const path = require('path');
const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('../util/database');

exports.getHomePage = (req,res,next)=>
{
    res.sendFile(path.join(__dirname, "../", "public", "views", "index.html"))
}

exports.getExpenses = (req,res,next)=>
{
    Expense.findAll({ where: { userId: req.user.id } })
    .then((expenses)=>{
        res.json(expenses);
    })
    .catch((err)=>console.log((err)));
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
