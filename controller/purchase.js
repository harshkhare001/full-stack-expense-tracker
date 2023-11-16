const Razorpay = require('razorpay');
// require('dotenv').config();
const Order = require('../models/orders');
const jwt = require('jsonwebtoken');


function generateAccessToken(id, email,ispremiumuser)
{
    return jwt.sign({ userId: id, email: email, ispremiumuser }, process.env.SECRET_KEY);
}


exports.purchasePremium = async (req, res, next)=>
{
    try 
    {
        var rzp = new Razorpay({
          key_id: process.env.RAZORPAY_KEY_ID,
          key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        rzp.orders.create({ amount: 2500, currency: "INR" }, async (err, order) => 
        {
          if (err) 
          {
            console.log("purchase.js error 1 >>   ", err);
            throw new Error(JSON.stringify(err));
          }
          const id = order.id
          await Order.create({
            orderId : id,
            status:"pending",
            userId : req.user.id
          })
          return res.status(201).json({ order, key_id: rzp.key_id });
        });
      } 
      catch (err) 
      {
        res.status(500).json({ message: "something went wrong in purchase.js", error: err });
      }
}

exports.updateTransaction = async (req, res, next) => 
{   
    const userId = req.user.id;
    try
    {
        const {payment_id, order_id} = req.body;
        const order = await Order.findOne({ where : { orderid:order_id } });
        const promise1 = order.update( { paymentid:payment_id, status:'Successful' });
        const promise2 = req.user.update({ispremiumuser:true});
        Promise.all([promise1,promise2])
        .then(()=>{ return res.status(202).json({success : true, message : "transaction success", token: generateAccessToken(userId,undefined,true)});})
        .catch((err)=>{throw new Error(err)});
    }
    catch(err)
    {
        return res.status(403).json({message : 'Somthing went wrong', success : false})
    }
}
