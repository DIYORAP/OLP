import User from "../model/User.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";


export const signup=async (req,res,next)=> {
    const {username,email,password,role}=req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword,role });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
       console.log("signup error",error);
    }
    
}
export const signin = async (req, res, next) => {
    const { email, password,role } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {

    console.log("signIN arror",error)   
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