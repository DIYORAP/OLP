import express from "express";
import { getAllCourses, getAllins, getAllStudents } from "../controllers/admin.controller.js";
const router =express.Router();

router.get('/courses',getAllCourses)
router.get('/students',getAllStudents)
router.get('/instructors',getAllins)


export default router;