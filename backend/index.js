const express= require('express');
const app=express();
const DB= require("./database").connectDB;

const router=express.Router;

const userRoutes=require("./routers/userRouter");

DB();

app.use(express.json());

app.listen(3000, () =>{
    console.log("Server is running on port 3000");
});

app.use("/api/user",userRoutes);
module.exports =router;