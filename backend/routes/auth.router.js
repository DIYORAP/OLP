import express from 'express';
import { signOut, signin, signina, signup } from '../controllers/Auth.controller.js';
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signina", signina);

router.get('/signout', signOut)

export default router;