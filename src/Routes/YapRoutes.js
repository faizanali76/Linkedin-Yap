import express from "express";
import {handleGenerateRequest, handleGetHistory} from "../controllers/YapController.js"
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate",verifyToken, handleGenerateRequest)

router.get("/history", verifyToken, handleGetHistory)

export default router;