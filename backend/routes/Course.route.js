import express from "express";
import { auth, isInstructor } from "../middlewares/auth.js";
import { createCourse, editCourse } from "../controllers/Courses.controllers.js";
import { createSection, deleteSection, upadteSection } from "../controllers/Section.controller.js";
 import {createSubSection,deleteSubSection,updateSubSection} from "../controllers/Subsection.js"
const router=express.Router();

router.post('/create',auth,isInstructor, createCourse);
router.post("/addSection",createSection);
router.post("/updateSection",auth,isInstructor,upadteSection);
router.post("/deleteSection",auth,isInstructor,deleteSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/editCourse", auth, isInstructor, editCourse);


export default router;



