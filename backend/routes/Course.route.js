import express from "express";
import { auth, isInstructor } from "../middlewares/auth.js";
import { createCourse } from "../controllers/Courses.controllers.js";
import { createSection, deleteSection, upadteSection } from "../controllers/Section.controller.js";
 
const router=express.Router();

router.post('/create',auth,isInstructor, createCourse);
router.post("/addSection",auth,isInstructor ,createSection);
router.post("/updateSection",auth,isInstructor,upadteSection);
router.post("/deleteSection",auth,isInstructor,deleteSection)
export default router;



