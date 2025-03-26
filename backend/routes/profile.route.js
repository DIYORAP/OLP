import express from "express";
import { auth, isInstructor } from "../middlewares/auth.js";
import {  adminShowAllStudents, getadminCourses, getEnrolledCourses, instructorDashboard, updateDisplayPicture, updateProfile } from "../controllers/Profile.controller.js";
const router=express.Router();

router.put("/updateProfile",auth,updateProfile);
router.put("/updateProfilePicture", auth,updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/getInstructorDashboardDetails",auth, instructorDashboard)
router.get("/getadmincourse",auth,getadminCourses)
router.get("/getadmin",auth,adminShowAllStudents)

export  default router;
