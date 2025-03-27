import express from "express";
import { auth, isInstructor } from "../middlewares/auth.js";
import {  adminShowAllStudents, adminShowAllStudents2, getadminCourses, getEnrolledCourses, instructorDashboard, updateDisplayPicture, updateProfile } from "../controllers/Profile.controller.js";
const router=express.Router();

router.put("/updateProfile",auth,updateProfile);
router.put("/updateProfilePicture", auth,updateDisplayPicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.get("/getInstructorDashboardDetails",auth, instructorDashboard)
router.get("/getadmincourse",auth,getadminCourses)
router.get("/getadmin",adminShowAllStudents)
router.get("/getadmin2",adminShowAllStudents2)


export  default router;
