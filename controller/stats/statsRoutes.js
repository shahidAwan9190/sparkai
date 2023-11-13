/** @format */

import express from "express";
import { addStats, getStats, updateStats, WelcomePage, deleteStats } from "./stats.js";
/** @format */

const router = express.Router();

router.get("", WelcomePage);
router.post("/addStats", addStats);
router.get("/getStats", getStats);
router.delete("/deleteStats", deleteStats);
router.put("/updateStats", updateStats);

export default router;
