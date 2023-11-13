/** @format */

import express from "express";
import { signup, login, s3Bucket } from "./admin.js";
/** @format */

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/s3Bucket", s3Bucket);

export default router;
