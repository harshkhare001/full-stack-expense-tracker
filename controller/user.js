const path = require('path');
const users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(id, email,ispremiumuser)
{
    console.log(process.env.SECRET_KEY);
    return jwt.sign({ userId: id, email: email, ispremiumuser }, process.env.SECRET_KEY);
}


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
        console.log(req.body);
        const user = await users.findOne({where : {email : email}});
        if(user)
        {
            return res.status(202).json({message : "User already exist"});
        }
        else
        {
            bcrypt.hash(password, 10, async(err,hash)=>
            {
                console.log(err);
                await users.create({name, email, password:hash});
                res.status(201).json({message: "User added successfully"});
            })
        }
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
            bcrypt.compare(password , user.password, (err,result)=>
            {
                if(err)
                {
                    throw new Error('Somthing went Wrong');
                }

                if(result===true)
                {
                    res.status(200).json({ success: true, message: "Login Successful!", token: generateAccessToken(user.id,user.email,user.ispremiumuser) });
                }
                else
                {
                    res.status(401).json({success : false, message:"Incorrect Password"});
                }
            });
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
