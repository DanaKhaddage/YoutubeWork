const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({
    firstName: {
        type:String,
        required: [true,"Please enter your first name"],
        minLength:3,
        trim:true,
    },
    lastName: {
        type:String,
        required: [true,"Please enter your last name"],
        minLength:3,
        trim:true,
    },
    email: {
        type:String,
        unique: true,
        lowercase: true,
        required: [true,"Please enter your email"],
        trim:true,
    },
    username: {
        type:String,
        unique: true,
        required: [true,"Please enter your username"],
        trim:true,
    },
    password: {
        type:String,
        required: [true,"Please enter your password"],
        minLength:8,
        trim:true,
    },
    passwordConfirm: { 
        type:String,
        required: [true,"Please confirm your password"],
        minLength:8,
        trim:true,
    },
    passwordChangedAt:Date,
    role: {
        type:String,
        default:"user",
        enum: ["admin","user"]
    },
    orders: [ 
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
    ],
    },
    {timestamps: true,}
);

userSchema.pre("save",async function(next){
    try{
        if(this.isModified("password")){
            return next();
        }
        this.password=await bcrypt.hash(this.password,12);
        this.passwordConfirm=undefined;

        return res.status(201).json({
            message:"User created successfully",
            data:{
                newUser,
            },
        });
    }catch(err){
        console.log(err);
    }   
});

userSchema.methods.checkPassword = async function(
    candidatePassword, // pass inside the body
    userPassword // pass inside the database
){
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangedAfterTokenIssued=function(JWTTimestamp){
    if(this.passwordChangedAt){
        const passwordChangedTime=parseInt(
            this.passwordChangedAt.getTime()/1000,
            10
        );
        return passwordChangedTime >JWTTimestamp; 
    }
    return false;
};

module.exports=mongoose.model("User",userSchema);