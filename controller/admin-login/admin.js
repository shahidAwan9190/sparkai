/** @format */

import { userSchema as User } from "../../models/model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { s3Client } from "../../server.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    console.log("existing user");
    console.log(existingUser);
    return res.status(400).json({ message: "user already exists" });
  }
  const hashedPassword = await bcryptjs.hash(password, 12);

  const users = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    users.save();
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  return res.status(201).json({ message: "User Created Successfully" });
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ username });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    console.log("existing user");
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  const validatePassword = bcryptjs.compareSync(
    password,
    existingUser.password
  );
  if (!validatePassword) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    id: existingUser.id,
    username: existingUser.username,
    email: existingUser.email,
  };

  const token = jwt.sign(data, jwtSecretKey);

  res.status(200).json({ token, message: "User Login Successfully " });
};

export const deleteuser = async (req, res, next) => {
  const { id } = req.body;
  try {
    const deletedUser = await User.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  return res.status(200).json({ message: "User deleted successfully" });
};

export const s3Bucket = async (req, res) => {
  try {
    console.log(req.files.file.name);
    const command = new PutObjectCommand({
      Bucket: "sparkai1",
      Key: req.files.file.name,
      Body: req.files.file.data,
      ContentType: req.files.file.mimetype,
    });

    await s3Client.send(command);
    console.log(req.files.file.data);

    res.status(200).json("sdfa");
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "something went wrong" });
  }
};
