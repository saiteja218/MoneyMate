import jwt from 'jsonwebtoken';
import  User  from '../models/user.model.js';

export const protectRoute=async (req, res, next) => {
    try {
        const token=req.cookies.jwt ;
        if(!token) {
            return res.status(401).json({ message: "Unauthorized, no token" })
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        // console.log(process.env.JWT_SECRET)
        // console.log("Decoded token",decoded)
        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized, invalid token" })
        }
        const user=await User.findById(decoded.userId).select("-password");
        // console.log("User found in protect route",user)
        if(!user) {
            return res.status(401).json({ message: "Unauthorized, no user found" })
        }
        req.user=user;
        next()
    } catch (error) {
        console.log("Error in protect route middleware", error.message)
        res.status(500).json({ message: "Internal server error" })
        
    }
}