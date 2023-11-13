/** @format */

import express from "express";
import { addTeam, updateTeam, getAllTeams, deleteTeam } from "./team.js";
/** @format */

const router = express.Router();

router.post("/addTeam", addTeam);
router.put("/updateTeam", updateTeam);
router.get("/getAllTeams", getAllTeams);
router.delete("/deleteTeam", deleteTeam);

export default router;
