import express from "express";
import {handleGenerateRequest} from "../controllers/YapController.js"
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate",verifyToken, handleGenerateRequest)

export default router;