import express from "express";
import { auth, isInstructor } from "../middlewares/auth.js";
import { getEnrolledCourses, instructorDashboard, updateProfile } from "../controllers/Profile.controller.js";
const router=express.Router();

router.put("/updateProfile",auth,updateProfile);
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/getInstructorDashboardDetails",auth, instructorDashboard)

export  default router;
