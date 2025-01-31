import dotenv from "dotenv";
dotenv.config();
import Course from "../model/Course.model.js";
import User from "../model/User.model.js";
import mongoose from "mongoose";
import { instance } from "../config/razorpay.js";
import crypto from "crypto";
import CourseProgress from "../model/CourseProgress.model.js";

export const capturePayment = async (req, res) => {
    const { courses } = req.body;
    console.log("Courses:", courses);
    const userId = req.user.id; 
    console.log("User ID:", userId);

    try {
        if(courses.length === 0) {
            return res.json({
                success:false,
                message:'Please provide valid course ID',
            })
        };

        let totalAmount = 0;

        for (const course_id of courses) {
                 console.log("courseid=",course_id);

            try {

                const course = await Course.findById(course_id);
                if (!course) {
                    return res.status(404).json({
                        success: false,
                        message: "Course not found",
                    });
                }

                const uid = new mongoose.Types.ObjectId(userId);
                if (course.studentsEnrolled.includes(uid)) {
                    return res.status(400).json({
                        success: false,
                        message: "Student is already enrolled",
                    });
                }

                totalAmount += course.price;
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }

        const receiptId = `receipt_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: receiptId,
        };

        try {
            const paymentResponse = await instance.orders.create(options);
            console.log("Payment Response:", paymentResponse);

            return res.status(200).json({
                success: true,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};   

export const verifySignature = async (req, res) => {
    const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;

    const userId = req.user.id;
    const {courses} = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Payment details are incomplete",
        });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    



    const enrolleStudent = async (courses, userId) => {
        if(!courses || !userId) {
            return res.status(400).json({
                success:false,
                message:'Please provide valid courses and user ID',
            });
        }
                try{
                    //update the course
                    for(const course_id of courses){
                    console.log("verify courses=",course_id);
                    const course = await Course.findByIdAndUpdate(
                        course_id,
                        {$push:{studentsEnrolled:userId}},
                        {new:true}
                    );
                    //update the user
                    const user = await User.updateOne(
                        {_id:userId},
                        {$push:{courses:course_id}},
                        {new:true}
                    );
                    //set course progress
                    const newCourseProgress = new CourseProgress({
                        userID: userId,
                        courseID: course_id,
                      })
                      await newCourseProgress.save()
                
                      //add new course progress to user
                      await User.findByIdAndUpdate(userId, {
                        $push: { courseProgress: newCourseProgress._id },
                      },{new:true});
                    //send email
                
                    }
                    return res.status(200).json({
                        success:true,
                        message:'Payment successful',
                    });
                }
                catch(error) {
                    console.error(error);
                    return res.status(500).json({
                        success:false,
                        message:error.message,
                    });
                }
            
        }

    try{
        //verify the signature
        const generatedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");
        if(generatedSignature === razorpay_signature) {
            await enrolleStudent(courses, userId);
        }

    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    
    }
};
