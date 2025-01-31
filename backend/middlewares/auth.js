
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt from "jsonwebtoken";
//import clgDev from "../utils/clgDev";


export const auth = async (req, res, next) => {
  try {
      const token = req.cookies.token 
          || req.body.token 
          || (req.header("Authorization") ? req.header("Authorization").replace("Bearer ", "") : null);

      console.log("Extracted Token:", token);
  
      if (!token) {
          return next(new ErrorResponse('User not authorized to access this route', 401));
      }

      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded;
          return next();
      } catch (error) {
          return next(new ErrorResponse("Invalid token, authorization denied", 401));
      }
  } catch (error) { 
      console.error("Auth Middleware Error:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
  

export const isStudent= async(req,res,next)=>{
    console.log("isStudent middleware",req.user.role);
    try {
        if(req.user.role !== "Student"){
        
            return res.status(401).json({
                success:false,
                messages:"only for the student _:)"
            })

        }
        return next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            messages:"user role cannot be varified"
        })  
    }
};

export const isInstructor = async (req, res, next) => {
    try {
      // Check if the user's role is "Instructor"
      if (req.user.role !== "Instructor") {
        return res.status(401).json({
          success: false,
          message: "This route is restricted to Instructors only.",
        });
      }
  
      // Proceed to the next middleware if the user is an Instructor
      return next();
        } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to verify user role. Please try again.",
      });
    }
  };
  
export const isAdmin = async (req, res, next) => {
    try{
           if(req.user.accountType !== "Admin") {
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
   }

