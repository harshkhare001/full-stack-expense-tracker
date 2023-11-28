const path = require('path');
const Sib = require('sib-api-v3-sdk');
const Users = require('../models/user');
const FPR = require('../models/forgotpasswordrequest');
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
require('dotenv').config();

const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.EMAIL_SECRET_KEY;

exports.getHomePage = (req, res, next)=>
{
    res.sendFile(path.join(__dirname, "../", "public", "views", "forgot-password.html"))
}

exports.sendEmail = async (req, res, next)=>
{
    const uu_id = uuidv4();
    try
    {
        const user = await Users.findOne({ where : { email : req.body.email}})
        if(!user)
        {
            res.status(404).json({ message: "User doesn't exist, Please sign up!"});
        }
        else
        {
            await FPR.create({
                id : uu_id,
                isactive : true,
                userId : user.id
            })
        }

        const tranEmailApi = new Sib.TransactionalEmailsApi();
   
   const sender = 
   {
    email : 'harshd.18.beis@acharya.ac.in',
    name : 'My-Expense'
   }
   const receivers = 
   [
    {
        email : req.body.email
    }
   ]
   tranEmailApi.sendTransacEmail({
    sender,
    to : receivers,
    subject : 'forgot Password',
    textContent : `Hi ${user.name},
    Please reset your Password using this password reset link http://65.1.136.178:3000/resetpassword/${uu_id}
    Thank You`
   })
   .then((result)=>{
        console.log(result);
        res.status(200).json({message :"Email Sent Successfully", success:true});
   })
   .catch(console.log)
    }
    catch(err)
    {
        res.status(500).json(err);
    } 
}


exports.getResetPasswordPage = async (req, res, next)=>
{
    const uu_id = req.params.uu_id;
    console.log(uu_id);
    try
    {
        const uuid = await FPR.findByPk(uu_id, { attributes: ["isactive"]});

        if(uuid && uuid.isactive)
        {
            res.sendFile(path.join(__dirname, "../", "public", "views", "resetpassword.html"))
        }
        else
        {
            res.status(404).json('File not found');
        }
    }
    catch(err)
    {
        console.log(err);
    }
}


exports.changePassword = async (req, res, next)=>
{
    const {uu_id, password} = req.body;
    try
    {
        const uuid = await FPR.findByPk(uu_id);

        if(!uuid.isactive)
        {
            res.status(404).send("<h1>page not found</h1>");
        }
        else
        {
            const user = await Users.findByPk(uuid.userId);
            bcrypt.hash(password, 10, async(err, hash)=>{
                await user.update({
                    password:hash
                })

                await uuid.update({
                    isactive : false
                })
            })
            res.status(201).json({ message: "password changed successfully, go to login" });
        }
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({ message: "server error" });
    }
}
