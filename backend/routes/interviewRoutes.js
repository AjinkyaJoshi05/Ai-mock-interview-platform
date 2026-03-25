import express from "express";
const router = express.Router();

import { startInterview } from "../controllers/interviewController.js";
import { submitAnswer } from "../controllers/interviewController.js";


router.post("/start", startInterview);
router.post("/answer", submitAnswer);

export default router;