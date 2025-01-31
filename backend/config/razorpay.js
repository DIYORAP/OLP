import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config(); 

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,  
    key_secret: process.env.RAZORPAY_SECRET,
});

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY);
console.log("Razorpay Secret:", process.env.RAZORPAY_SECRET);
