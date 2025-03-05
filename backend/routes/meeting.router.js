import express from "express";
import { createSession, getSessions, joinSession } from "../controllers/Session.controller.js";

const router = express.Router();

router.post("/create-session", createSession);
router.get("/sessions", getSessions);
router.post("/join-session", joinSession);

export default router;
