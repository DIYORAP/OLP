import express from "express";
import { auth, isInstructor } from "../middlewares/auth.js";
import { getEnrolledCourses, updateProfile } from "../controllers/Profile.controller.js";
const router=express.Router();

router.put("/updateProfile",auth,updateProfile);
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
export  default router;
