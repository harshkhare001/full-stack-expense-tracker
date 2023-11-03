const path = require('path');
const users = require('../models/user');

exports.getSignUpPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, "../", "public", "views", "signup.html"))
}

exports.getLoginPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, "../", "public", "views", "login.html"))
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
        res.status(200).json(result);
    })
    .catch((err)=>{
        res.status(500).json(err);
        console.log(err);
    })
}

exports.login = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    users.findOne({ where : { email : email}})
    .then((user)=>{
        if(user)
        {
            if(user.password === password){
                res.status(200).json({ success: true, message: "Login Successful!" });
            }
            else {
                res.status(401).json({success : false, message:"Incorrect Password"});
            }
        }
        else{
            res.status(404).json({success:false, message: "User Not Found"});
        }
    })
    .catch((err)=>{
        console.log(err);
    })
}
