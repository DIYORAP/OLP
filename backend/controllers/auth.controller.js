import User from "../model/User.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";
import Profile from "../model/Profile.model.js"

export const signup=async (req,res,next)=> {
    const {username,email,password,role}=req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);


    const existingUser=await User.findOne({email});

    if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}



    const profileDetails=await Profile.create({ });

    const newUser = new User({ username, email, password: hashedPassword,role,additionalDetails:profileDetails });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
       console.log("signup error",error);
    }

  //   const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);

  //   // Exclude password from the response
  //   const { password: pass, ...rest } = newUser._doc;

  //   // Set cookie and respond
  //   res
  //     .cookie('access_token', token, { httpOnly: true })
  //     .status(201)
  //     .json(rest);
  // } catch (error) {
  //   console.log('SignUp error', error);
  //   next(error); // Pass the error to the error handler middleware
  // }
    
}

export const signin = async (req, res, next) => {
  const { email, password, role } = req.body; 
 
  try {
    if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, 'User not found!'));

     
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    if (user.role !== role) {   
      return next(errorHandler(403, 'Unauthorized role!'));
    }
 
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET,{expiresIn:"24h"});
    user.token = token;
    user.password = undefined;
    const { password: pass, ...rest } = user._doc;

    res 
      .cookie('token', token, { httpOnly: true })
      .status(200)
      .json(rest);

  } catch (error) {
    console.log('SignIn error', error);
    next(error); 
  }
};


  export const signOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      console.log("signOut error",error);
    }
  };