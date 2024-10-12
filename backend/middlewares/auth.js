import ErrorResponse from "../utils/ErrorResponse";
import jwt from "jsonwebtoken";
//import clgDev from "../utils/clgDev";

export const protect=async(req,res,next)=>{
    try {
        const token = req.cookies?.access_token || req.headers?.authorization?.replace('Bearer ', '');
        if (!token) {
            return next(new ErrorResponse('User not authorized to access this route', 401));
          }
          try {
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
            return next();
          } catch (error) {
           return next(new ErrorResponse("User not authorized to access this route",401));

          }
    } catch (error) {
         next(new ErrorResponse('Something went wrong while validating user', 500));   
    }
};


export const authorize= (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse("user not authorized to access this route ",401));

        }
        next();
    };
};


// ADMIN AND SITEOWN BAKI   


