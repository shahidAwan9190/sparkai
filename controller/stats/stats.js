/** @format */

import { statsSchema, teamsSchema } from "../../models/model.js";

export const addStats = async (req, res) => {
  try {
    let existingUser;
    try {
      existingUser = await statsSchema.find({});
      console.log(existingUser[0]);
    } catch (err) {
      console.log(err);
    }
    if (existingUser[0]) {
      console.log("existing Statas");
      return res.status(400).json({
        success: false,
        message: "Admin Already Added Stats Please Updatae Stats",
      });
    }
    const { satisfiedClient, projectsCompleted, countries } = req.body;
    const currentYear = new Date().getFullYear();
    const companyStarted = 2020;
    const totalExperience = currentYear - companyStarted;
    const stats = new statsSchema({
      satisfiedClient,
      projectsCompleted,
      countries,
      totalExperience,
    });
    try {
      stats.save();
    } catch (err) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Data saved succesfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something Went worng",
      error: err,
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const existingStats = await statsSchema.findOne();
    const members = await teamsSchema.find();
    if (!existingStats) {
      return res.status(404).json({
        success: false,
        message: "Statistics data not found",
      });
    }
    const list = {
      ...existingStats.toObject(),
      members: members.length,
    };

    res.status(200).json({
      success: true,
      data: list,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

export const updateStats = async (req, res) => {
  try {
    const statsId = req.query.id;
    const { satisfiedClient, projectsCompleted, countries } = req.body;

    const updatedStats = await statsSchema.findByIdAndUpdate(
      statsId,
      {
        satisfiedClient,
        projectsCompleted,
        countries,
      },
      { new: true }
    );

    if (!updatedStats) {
      return res.status(404).json({
        success: false,
        message: "Statistics data not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedStats,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};


export const deleteStats = async (req, res) => {
  try {
    const statsId = req.query.id; 
    const deletedStats = await statsSchema.findByIdAndDelete(statsId);
    if (!deletedStats) {
      return res.status(404).json({
        success: false,
        message: "Statistics data not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Statistics data deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};


export const WelcomePage = async (req, res) => {
  try {
    const html = `
      <html>
      <head>
        <style>
          /* Your CSS code here */
          html {
            background-color: #10151B;
            background: url(https://static.pexels.com/photos/3797/black-and-white-sport-fight-boxer.jpg) no-repeat center center fixed;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
          }
          
          body {
            font-family: "Oswald", sans-serif;
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
          }
          
          h1 {
            line-height: .95;
            color: #66fcf1;
            font-weight: 900;
            font-size: 150px;
            text-transform: uppercase;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            pointer-events: none;
          }
          
          .center {
            position: absolute;
            margin: auto;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 581px;
            height: 50%;
          }
          
          .btn {
            margin: 0 auto;
            width: 170px;
            height: 60px;
            padding: 6px 0 0 3px;
            border: 2px solid #66fcf1;
            border-radius: 2px;
            background: none;
            font-size: 16px;
            line-height: 54px;
            color: #fff;
            letter-spacing: .25em;
            text-decoration: none;
            font-weight: 600;
            text-transform: uppercase;
            vertical-align: middle;
            text-align: center;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            -webkit-transition: background .4s, color .4s;
            transition: background .4s, color .4s;
            cursor: pointer;
          }
          
          .btn:hover {
            background: #66fcf1;
            color: #10151B;
          }
        </style>
      </head>
      <body>
        // <div class="center">

        // </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};
