import express from "express";
import { auth, isInstructor, isStudent } from "../middlewares/auth.js";
import { createCourse, deleteCourse, editCourse, getAll, getCourseDetails, getFullCourseDetails, getInstructorCourses, markLectureAsComplete } from "../controllers/Courses.controller.js";
import { createRating, getAllRating, getAverageRating } from "../controllers/RatingAndReviews.controller.js";
import { createSection, deleteSection, upadteSection } from "../controllers/Section.controller.js";
 import {createSubSection,deleteSubSection,updateSubSection} from "../controllers/Subsection.controller.js"
//import { createMetting, getmtting } from "../controllers/Session.controller.js";
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
router.post("/getFullCourseDetails",auth,getFullCourseDetails);
router.post("/deletecourse",auth,isInstructor,deleteCourse);
router.get("/cou",getAll);
router.post("/getCourseDetails", getCourseDetails)
router.post("/updateCourseProgress", auth, markLectureAsComplete);

// ********
// ********
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

//// metting


export default router;



