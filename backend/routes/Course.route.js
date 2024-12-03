import express from "express";
import { auth, isInstructor } from "../middlewares/auth.js";
import { createCourse, deleteCourse, editCourse, getAll, getCourseDetails, getFullCourseDetails, getInstructorCourses } from "../controllers/Courses.controller.js";
import { createSection, deleteSection, upadteSection } from "../controllers/Section.controller.js";
 import {createSubSection,deleteSubSection,updateSubSection} from "../controllers/Subsection.controller.js"
const router=express.Router();

router.post('/create',auth,isInstructor, createCourse);
router.post("/addSection",createSection);
router.post("/updateSection",auth,isInstructor,upadteSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.post("/getFullCourseDetails",auth,isInstructor,getFullCourseDetails);
router.post("/deletecourse",auth,isInstructor,deleteCourse);
router.get("/cou",getAll);
router.post("/getCourseDetails", getCourseDetails)

export default router;



