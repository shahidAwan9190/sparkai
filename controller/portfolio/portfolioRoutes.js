/** @format */

import express from "express";
import {
  addPortfolio,
  getAllFiles,
  getFile,
  updatePortfolio,
  deleteFile,
} from "./portfolio.js";
/** @format */

const router = express.Router();
router.post("/addPortfolio", addPortfolio);
router.get("/get", getAllFiles);
router.get("/getFile", getFile);
router.put("/updateFile", updatePortfolio);
router.delete("/deleteFile", deleteFile);

export default router;
