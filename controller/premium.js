const User = require('../models/user');

exports.showLead = (req, res, next)=>{

    if(req.user.ispremiumuser)
    {
        User.findAll({attributes: ["name", "totalExpense"]})
        .then((users)=>{
            users.sort(function (a, b) {
                return b.totalExpense - a.totalExpense;
            });
            res.json(users);
        })
    }
    else 
    {
        res.json({ success: false, messege: "not a premium user" });
    }
}