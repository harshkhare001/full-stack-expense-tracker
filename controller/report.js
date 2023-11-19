const path = require('path');
const Expense = require('../models/expense');
const downloadedFiles = require('../models/downloadedfiles');
const S3Services = require('../services/s3services');
const Users = require('../models/user')
require('dotenv').config();

exports.getReportPage = async (req,res,next)=>
{
   res.sendFile(path.join(__dirname, "../", "public", "views", "expensereport.html")); 
}

exports.getMonthlyExpenses = async (req, res, next)=>
{
    try
    {
        const user = await Users.findOne({where : { id : req.user.id }});
        if(user.ispremiumuser)
        {
            const expenses = await Expense.findAll({ where: { userId: req.user.id } })
            res.status(200).json(expenses);
        }
        else
        {
            res.status(202).json({message:'Not a premium user', success:false});
        }
        
    }
    catch(err)
    {
        console.log(err);
    }
}

exports.downloadExpense = async (req, res, next)=>
{
    try
    {
        const expenses = await Expense.findAll({ where: { userId: req.user.id } });
        const StringExpense = JSON.stringify(expenses, undefined, '\t');
        const fileName = `Expense_${req.user.name}/${new Date()}.txt`;
        const fileURL = await S3Services.uploadToS3(StringExpense, fileName);
        await downloadedFiles.create({
            fileUrl : fileURL,
            userId : req.user.id
        })
        res.status(200).json({fileUrl : fileURL, success:true});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({fileUrl : '', success:false});
    }
}
