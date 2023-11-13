/** @format */

import express from "express";
import {
  sendMail,
  sendMailBySparkai,
  getEmailById,
  getAllEmails,
  readEmail,
} from "./email.js";

const router = express.Router();
router.post("/sendMail", sendMail);
router.post("/sendMailBySparkai", sendMailBySparkai);
router.get("/getEmailById", getEmailById);
router.get("/getAllEmails", getAllEmails);
router.get("/readEmail", readEmail);

export default router;
