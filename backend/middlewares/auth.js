import User from "../models/userSchema.js";
import asyncHandler from "./asyncHandler.js";
import jwt from 'jsonwebtoken';
const authenticate = asyncHandler(async (req, res, next)=>{
    let token = req.cookies.jwt;

    if(token){
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("No Authorization, Token Failed");
        } 
    } else{
        res.status(401);
        throw new Error("No Authentication, No Token");
    }
});

const authorizeAdmin = asyncHandler(async (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next();
    } else{
        res.status(404).send('Not authorized as an Admin');
        return;
    }
});

export {authenticate, authorizeAdmin};