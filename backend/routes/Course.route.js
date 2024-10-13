import express from "express";
import { protect,authorize } from "../middlewares/auth.js";
import { createCourse } from "../controllers/Courses.controllers.js";

 
const router=express.Router();

router.post('/create', protect, createCourse);

export default router;



