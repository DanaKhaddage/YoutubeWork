const Product=require('../models/productModel');
const User=require('../models/userModel');

const checkAdmin=async(req)=>{
    try{
        const user=await User.findOne({_id:req.user._id});
        if(!user || user.role!=="admin") {
            return false;
        }else{
            return true;
        }

    }catch(e){
        console.log(e);
    }
};

exports.createProduct=async(req,res)=>{
    try{
        const user=await checkAdmin(req);
        if(user==false) {
            return res.status(401).json({message:"You are not authorized to perform this action"});
        }

        const newProduct=new Product.create({
            productName:req.body.productName,
            productDescription:req.body.productDescription,
            productPrice:req.body.productPrice,
            productQuantity:req.body.productQuantity,
            createdBy:req.user._id, //since its an object id that refers to the user
        });

        await newProduct.save();
        return res.status(201).json({message:"Product created successfully",product:newProduct});
    }catch(e){
        console.log(e);
        res.status(500).json(e);
    }
};

exports.updateProduct=async(req,res)=>{
    try{
        const user=await checkAdmin(req);
        if(user==false) {
            return res.status(401).json({message:"You are not authorized to perform this action"});
        }
        const product=await Product.findByIdAndUpdate(
            req.params.productID,
            req.body,
            {new:true}
        );
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        return res.status(200).json({message:"Product updated successfully"});
    }catch(e) {
        console.log(e);
        res.status(500).json(e);
    }
};

exports.deleteProduct=async(req,res)=>{
    try{
        const user=await checkAdmin(req);
        if(user==false) {
            return res.status(401).json({message:"You are not authorized to perform this action"});
        }
        const product=await Product.findByIdAndDelete(req.params.productID);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        return res.status(200).json({message:"Product deleted successfully"});
    }catch(e) {
        console.log(e);
        res.status(500).json(e);
    }
};

exports.getAllProducts=async(req,res)=>{
    try{
        const user=await checkAdmin(req);
        if(user==false) {
            return res.status(401).json({message:"You are not authorized to perform this action"});
        }
        const products=await Product.find();
        if(products.length<=0){
            return res.status(404).json({message:"Products not found"});
        }

        return res.status(200).json({message:"Products fetched successfully",products});

    }catch(e){
        console.log(e);
        res.status(500).json(e);
    }
};
