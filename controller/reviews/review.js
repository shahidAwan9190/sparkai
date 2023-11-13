/** @format */

import { reviews } from "../../models/model.js";

export const addReview = async (req, res) => {
  try {
    const { clientName, language, description, rating } = req.body;

    const newFile = new reviews({
      clientName: clientName,
      language: JSON.parse(language),
      description: description,
      rating: parseFloat(rating),
    });
    await newFile.save();
    console.log(newFile);
    if (req.files) {
      const file = req.files.file;
      const base64Data = await file.data.toString("base64");
      newFile.fileName = file.name;
      newFile.data = base64Data;
      newFile.contentType = file.contentType;
      await newFile.save();
    } else {
      newFile.fileName = null;
      newFile.data = null;
      newFile.contentType = null;
      newFile.data = null;
      await newFile.save();
    }
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    let allReviews;
    let count;
    let page;

    if (!req.query.page) {
      allReviews = (await reviews.find()).reverse();
      count = await reviews.countDocuments();
    } else {
      page = req.query.page || 1;
      const perPage = req.query.limit || 5;

      allReviews = await reviews
        .find()
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ _id: -1 });
    }
    count = await reviews.countDocuments();

    if (!allReviews || allReviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }
    res.status(200).json({ allReviews, count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { reviewId, clientName, language, description, rating } = req.body;

    const existingReview = await reviews.findById(reviewId);

    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (clientName) {
      existingReview.clientName = clientName;
    }

    if (language) {
      existingReview.language = JSON.parse(language);
    }
    if (description) {
      existingReview.description = description;
    }

    if (rating) {
      existingReview.rating = parseFloat(rating);
    }

    if (req.files) {
      const file = req.files.file;
      const base64Data = await file.data.toString("base64");
      existingReview.fileName = file.name;
      existingReview.data = base64Data;
      existingReview.contentType = file.contentType;
    }

    await existingReview.save();

    res.status(200).json({ message: "Review updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Something Went Wrong" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.query;

    const result = await reviews.deleteOne({ _id: reviewId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Something went wrong" });
  }
};
