const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required: [true,"Add the product name"],
        minLength:3,
        trim:true,
        unique:true,
    },
    productDescription: {
        type:String,
        required: [true,"Add the product description"],
        minLength:3,
        maxLength:255,
        trim:true,
    },
    productImage: {
        type:String,
        default:""
    },
    productPrice: {
        type:Schema.Types.Decimal128,
        required: [true,"Add the product price"],
        default: 0.00,
    },
    productQuantity: {
        type:Number,
        required: [true,"Add the product quantity"],
        default: 0,
    },
    createdBy: {
        type:Schema.Types.ObjectId,
        ref:"User",
    }
},
    {
        timestamps: true
    }
);

module.exports=mongoose.model("Product",productSchema);
