/** @format */

import express from "express";
import {
  addReview,
  getAllReviews,
  updateReview,
  deleteReview,
} from "./review.js";
/** @format */

const router = express.Router();

router.post("/addReview", addReview);
router.get("/getAllReviews", getAllReviews);
router.put("/updateReview", updateReview);
router.delete("/deleteReview", deleteReview);

export default router;
