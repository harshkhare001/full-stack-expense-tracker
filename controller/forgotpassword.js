const path = require('path');
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

exports.getHomePage = (req, res, next)=>
{
    res.sendFile(path.join(__dirname, "../", "public", "views", "forgot-password.html"))
}

exports.getEmail = (req, res, next)=>
{
   const client = Sib.ApiClient.instance;
   const apiKey = client.authentications['api-key'];
   apiKey.apiKey = process.env.EMAIL_SECRET_KEY;
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
    to:receivers,
    subject : 'forgot Password',
    textContent : `Reset your Password`
   })
   .then(console.log)
   .catch(console.log)
}