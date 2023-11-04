const Razorpay = require('razorpay');
const Order = require('../models/orders');


exports.purchasePremium = async (req, res, next)=>{
    try {
        var rzp = new Razorpay({
          key_id: 'rzp_test_3EMdUaEXecM3FV',
          key_secret: 'vv4cPp48iIbn8sd0CXX9SbFS',
        });
        //const amount = 2500;
        rzp.orders.create({ amount: 2500, currency: "INR" }, async (err, order) => {
          if (err) {
            console.log("purchase.js error 1 >>   ", err);
            throw new Error(JSON.stringify(err));
          }
          console.log(order.id)
          const id = order.id
        //   await req.user.createOrder({
        //     orderid: order.id,
        //     status: "pending",
        //   });
          await Order.create({
            orderId : id,
            status:"pending",
            userId : req.user.id
          })
    
          // console.log("order    >>    ", result, rzp.key_id);
          return res.status(201).json({ order, key_id: rzp.key_id });
        });
      } catch (err) {
        console.log("purchase.js error 2 ",err);
        res.status(500).json({ message: "something went wrong in purchase.js", error: err });
      }
}

exports.updateTransaction = (req,res,next)=>{
    try{
        const{payment_id, order_id}= req.body;
        console.log('this is order id >>>>>>>>',order_id);
        Order.findOne({where : { orderid:order_id}})
        .then(order=>{
            order.update({paymentid:payment_id, status:'Successful'})
            .then(()=>{
                req.user.update({ispremiumuser:true})
                .then(()=>{
                    return res.status(202).json({success : true, message : "transaction success"});
                })
                .catch(err=>{
                    throw new Error(err);
                })
            })
            .catch(err=>{
                throw new Error(err);
            })
        })
        .catch(err=> {throw new Error(err)});
    }
    catch(err)
    {

    }
}