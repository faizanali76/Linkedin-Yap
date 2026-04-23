import express from "express";
import {handleGenerateRequest} from "../controllers/YapController.js"

const router = express.Router();

router.post("/generate", handleGenerateRequest)

export default router;