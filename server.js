/** @format */

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import statsRouter from "./controller/stats/statsRoutes.js";
import portfolioRouter from "./controller/portfolio/portfolioRoutes.js";
import reviewsRouter from "./controller/reviews/reviewsRoutes.js";
import teamRouter from "./controller/team/teamRoutes.js";
import emailRouter from "./controller/email/emailRoutes.js";
import vancanyRouter from "./controller/vacancies/vacanciesRoutes.js";
import adminRouter from "./controller/admin-login/adminRoutes.js";
import Middle from "./middeleware.js";
import clientMiddleware from "./clientMiddleware.js";
import { S3Client } from "@aws-sdk/client-s3";
import onlyClientRoutes from "./controller/adminRoutes/adminRoutes.js";
import cors from "cors";

const doten = dotenv.config();

export const s3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

import fileUpload from "express-fileupload";
const PORT = process.env.PORT || 8000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use("/", statsRouter);

app.use("/api", Middle, statsRouter);
app.use("/api", Middle, portfolioRouter);
app.use("/api", Middle, reviewsRouter);
app.use("/api", Middle, teamRouter);
app.use("/api", Middle, emailRouter);
app.use("/api", Middle, vancanyRouter);
app.use("/api", Middle, adminRouter);
app.use("/client", clientMiddleware, onlyClientRoutes);

mongoose
  .connect(
    "mongodb+srv://admin:Pakistan0335@backend.0nuohli.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(PORT))
  .then(
    console.log(`CONNECTED TO DATABASE AND LISTENING TO PORT localhost:${PORT}`)
  )
  .catch((err) => console.log("ERROR CONECTION TO DATABASE", err));

//Pakistan0335

// try {
//   app.listen(8000);
//   console.log("connected");
// } catch {
//   (err) => {
//     console.log(err);
//   };
// }
