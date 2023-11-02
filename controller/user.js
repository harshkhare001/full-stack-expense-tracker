const path = require('path');
const users = require('../models/user');

exports.getSignUpPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, "../", "public", "views", "signup.html"))
}

exports.addUser = (req,res,next)=>{
    console.log(req.body);
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    users.create({
        name:name,
        email:email,
        password:password
    })
    .then((result)=>{
        console.log('User Added');
        res.status(201).json(result);
    })
    .catch((err)=>{
        console.log(err);
    })
}