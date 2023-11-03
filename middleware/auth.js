const jwt = require('jsonwebtoken');

const Users = require('../models/user');

const authenticate = (req, res, next)=>
{
    try
    {
        const token = req.headers("Authorization");
        const user = jwt.verify(token, "kjhsgdfiuiew889kbasgdfskjabsdfjlabsbdljhsd");
        Users.findByPk(user.userId).then((user)=>{
            req.user = user;
            next();
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(401).json({ success: false });
    }
}

module.exports = authenticate;
