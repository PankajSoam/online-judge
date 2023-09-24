const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400).json({error:{
            message: "user already exists",
        }});
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else {
         res.status(400).json({
            error: {
                message: "Error occured!!  please try again"
            }
         })
    }


    
});

const authUser = asyncHandler(async (req,res) => {
    const {  email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else {
        res.status(400).json({
            error:{
                message: "Invalid email or password ",
            }
        })
    }

    

    
});
module.exports  = {
registerUser,
authUser,
};