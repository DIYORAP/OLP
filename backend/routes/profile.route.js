import express from "express";
import { auth, isInstructor } from "../middlewares/auth.js";
import { updateProfile } from "../controllers/Profile.controller.js";
const router=express.Router();

router.put("/updateProfile",auth,updateProfile);
//router.get("/getUserDetails",auth, )
export  default router;
