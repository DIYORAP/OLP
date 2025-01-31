import express from "express";
import { auth, isStudent } from "../middlewares/auth.js";
import { capturePayment, verifySignature } from "../controllers/Payments.controller.js";
const router = express.Router();


router.post("/capturePayment", auth,isStudent,capturePayment);
router.post("/verifyPayment",auth,verifySignature);
export default router;
  