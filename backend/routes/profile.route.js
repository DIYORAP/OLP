import express from "express";
import { auth, isInstructor } from "../middlewares/auth";
import { updateProfile } from "../controllers/Profile.contoller";
const router=express.Router();

router.put("/updateProfile",auth,updateProfile);
//router.get("/getUserDetails",auth, )

