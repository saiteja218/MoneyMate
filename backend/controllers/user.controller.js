import { generateToken } from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup=async(req,res)=>{
    const {name,email,password}=req.body;

    try{
        if(!name ||!email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }

        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);


        const newUser=new User({
            name,email,password:hashedpassword
        })

        if(newUser){
            await newUser.save();
            // console.log("New user created",newUser)
            const token=generateToken(newUser._id,res);
            // console.log("Token",token)
           
            return res.status(201).json({
                message:"User created successfully",
                
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                // isAdmin:newUser.isAdmin,
                // token
            })
        }
        else{
            return res.status(400).json({message:"User not found"})
        }
    }catch(err){
        console.log("Error in signup controller", err.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }

        const user= await User.findOne({
            email
        })
        if(!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token=generateToken(user._id,res);
        // console.log("Token",token)

        res.status(200).json({
            message:"Login successful",
            _id:user._id,
            name:user.name,
            email:user.email,
            // isAdmin:user.isAdmin,
            // token
        })

    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({ message: "Internal server error" })
        
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal server error" })

    }
}