const Cart=require("../models/cartModel");
const User=require("../models/userModel");
const Order=require("../models/orderModel");

exports.createNewOrder = async(req,res)=>{
    try{
        const cart=await Cart.findOne({_id:req.body.cartID});
        if(!cart){
            return res.status(404).json({message:"Cart not found"});
        }

        const cartOwner=await User.findOne({_id:req.body.cartOwner});
        if(!cartOwner){
            return res.status(404).json({message:"User not found"});
        }

        const newOrder= new Order({
            orderOwner:cartOwner._id,
            items:cart.products,
            status:"Pending",
        });

        await newOrder.save();
        cart.products=[];
        await cart.save();

        res.status(200).json({message:"Order created successfully"});
        
    }catch(e){
        console.log(e);
        res.status(500).json(e);
    }
    
}