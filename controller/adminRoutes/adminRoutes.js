/** @format */

import express from "express";

import { getAllTeams } from "../team/team.js";
import { getAllFiles } from "../portfolio/portfolio.js";
import { getAllReviews } from "../reviews/review.js";
import { getStats } from "../stats/stats.js";
import { getVacancies } from "../vacancies/vacancies.js";
const router = express.Router();

router.get("/getAllTeams", getAllTeams);
router.get("/getAllFiles", getAllFiles);
router.get("/getAllReviews", getAllReviews);
router.get("/getStats", getStats);
router.get("/getVacancies", getVacancies);

export default router;
