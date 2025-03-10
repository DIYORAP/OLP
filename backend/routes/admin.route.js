import express from "express";
import { getAllCourses, getAllStudents } from "../controllers/admin.controller.js";
const router =express.Router();

router.get('/courses',getAllCourses)
router.get('/students',getAllStudents)


export default router;