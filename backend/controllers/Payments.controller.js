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
    const userId = req.user.id;

    try {
        if (!courses || courses.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid course IDs",
            });
        }

        let totalAmount = 0;

        for (const course_id of courses) {
            try {
                const course = await Course.findById(course_id);
                if (!course) {
                    console.warn(`Course ID ${course_id} not found, skipping.`);
                    continue;
                }

                const uid = new mongoose.Types.ObjectId(userId);
                if (course.studentsEnrolled.includes(uid)) {
                    console.warn(`User ${userId} already enrolled in ${course_id}, skipping.`);
                    continue;
                }

                totalAmount += course.price;
            } catch (error) {
                console.error(`Error processing course ${course_id}:`, error.message);
                continue;
            }
        }

        if (totalAmount === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid courses found for payment.",
            });
        }

        const receiptId = `receipt_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`;
        const options = {
            amount: totalAmount * 100, // Convert to paise
            currency: "INR",
            receipt: receiptId,
        };

        const paymentResponse = await instance.orders.create(options);
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
            message: "Payment initiation failed: " + error.message,
        });
    }
};

// Helper function for enrolling students
const enrollStudent = async (courses, userId) => {
    if (!courses || !userId) {
        return { success: false, message: "Invalid courses or user ID" };
    }

    try {
        for (const course_id of courses) {
            console.log("Enrolling in course:", course_id);

            const course = await Course.findByIdAndUpdate(
                course_id,
                { $addToSet: { studentsEnrolled: userId } }, // Prevent duplicate enrollment
                { new: true }
            );

            if (!course) {
                console.warn(`Course with ID ${course_id} not found.`);
                continue;
            }

            await User.findByIdAndUpdate(
                userId,
                { $addToSet: { courses: course_id } },
                { new: true }
            );

            const newCourseProgress = new CourseProgress({
                userID: userId,
                courseID: course_id,
            });

            await newCourseProgress.save();

            await User.findByIdAndUpdate(
                userId,
                { $push: { courseProgress: newCourseProgress._id } },
                { new: true }
            );
        }

        return { success: true, message: "Enrollment successful" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Enrollment failed: " + error.message };
    }
};

export const verifySignature = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, courses } = req.body;
    const userId = req.user.id;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Payment details are incomplete",
        });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    try {
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment signature",
            });
        }

        const result = await enrollStudent(courses, userId);
        return res.status(result.success ? 200 : 500).json(result);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Signature verification failed: " + error.message,
        });
    }
};
