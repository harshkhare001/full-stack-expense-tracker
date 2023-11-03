const path = require('path');
const users = require('../models/user');
const bcrypt = require('bcrypt');

exports.getSignUpPage = (req,res,next)=>
{
    res.sendFile(path.join(__dirname, "../", "public", "views", "signup.html"))
}

exports.getLoginPage = (req,res,next)=>
{
    res.sendFile(path.join(__dirname, "../", "public", "views", "login.html"))
}

exports.addUser = async(req,res,next)=>
{
    try
    {
        const {name, email, password } = req.body;

        bcrypt.hash(password, 10, async(err,hash)=>
        {
            console.log(err);
            await users.create({name, email, password:hash});
            res.status(201).json({message: "User added successfully"});
        })
    }
    catch(e)
    {
        res.status(500).json(e);
    }
}

exports.login = async (req,res,next)=>
{
    const email = req.body.email;
    const password = req.body.password;
    try
    {
        const user = await users.findOne({ where : { email : email}})
        if(user)
        {
            if(user.password === password)
            {
                res.status(200).json({ success: true, message: "Login Successful!" });
            }
            else 
            {
                res.status(401).json({success : false, message:"Incorrect Password"});
            }
        }
        else
        {
            res.status(404).json({success:false, message: "User Not Found"});
        }
    } 
    catch(err)
    {
        console.log(err);
    }
}
