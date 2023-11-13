/** @format */

import nodemailer from "nodemailer";

export var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shahidmuneerawan@gmail.com",
    pass: "fterdswhtvavvbuo",
  },
});
