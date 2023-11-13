/** @format */

import { vacanciesSchema } from "../../models/model.js";

export const addVacancy = async (req, res) => {
  try {
    const {
      title,
      intro,
      roles,
      qualifications,
      perks,
      status,
      location,
      salary,
      position,
      engagment,
      experience,
      timeSlot,
      skills,
      expectations,
    } = req.body;

    const newVacancy = new vacanciesSchema({
      title,
      intro,
      roles,
      qualifications,
      perks,
      status,
      time: new Date(),
      location,
      salary,
      position,
      engagment,
      experience,
      timeSlot,
      skills,
      expectations,
    });

    await newVacancy.save();
    return res.status(200).json({ message: "Vacancy added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "SOMETHING WENT WRONG" });
  }
};

export const getVacancies = async (req, res) => {
  try {
    const vacancies = await vacanciesSchema.aggregate([
      {
        $lookup: {
          from: "emails",
          localField: "_id",
          foreignField: "idOfVacancy",
          as: "replies",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          intro: 1,
          roles: 1,
          qualifications: 1,
          perks: 1,
          status: 1,
          time: 1,
          location: 1,
          salary: 1,
          position: 1,
          engagment: 1,
          experience: 1,
          timeSlot: 1,
          skills: 1,
          expectations: 1,
          replyCount: { $size: "$replies" },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);
    if (vacancies.length === 0) {
      return res.status(404).json({ message: "No vacancies found" });
    }
    return res.status(200).json(vacancies);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const idsAndTitleGet = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.limit) || 5;
  try {
    // const vacancies = await vacanciesSchema.find();

    const skip = (page - 1) * pageSize;

    const vacancies = await vacanciesSchema
      .aggregate([
        {
          $lookup: {
            from: "emails",
            localField: "_id",
            foreignField: "idOfVacancy",
            as: "replies",
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            time: 1,
            intro: 1,
            status: 1,
            location: 1,
            engagment: 1,
            count: { $size: "$replies" },
          },
        },
      ])
      .skip(skip)
      .limit(pageSize);
    const count = await vacanciesSchema.countDocuments();
    if (vacancies.length === 0) {
      return res.status(404).json({ message: "No vacancies found" });
    }
    return res.status(200).json({ vacancies, count });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateVacancy = async (req, res) => {
  try {
    const { id } = req.query;
    const {
      title,
      intro,
      roles,
      qualifications,
      perks,
      status,
      location,
      salary,
      position,
      engagment,
      experience,
      timeSlot,
      skills,
      expectations,
    } = req.body;

    const data = {
      title,
      intro,
      roles,
      qualifications,
      perks,
      status,
      location,
      salary,
      position,
      engagment,
      experience,
      timeSlot,
      skills,
      expectations,
    };

    const result = await vacanciesSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    // if (engagment) {
    //   result.engagment = engagment;
    // }
    // if (position) {
    //   result.position = position;
    // }
    // if (salary) {
    //   result.salary = salary;
    // }
    // if (location) {
    //   result.location = location;
    // }
    // if (status) {
    //   result.status = status;
    // }
    // if (intro) {
    //   result.intro = intro;
    // }
    // if (title) {
    //   result.title = title;
    // }
    // if (roles) {
    //   result.roles = roles;
    // }
    // if (qualifications) {
    //   result.qualifications = qualifications;
    // }
    // if (perks) {
    //   result.perks = perks;
    // }
    // result.save();
    if (!result) {
      return res.status(404).json({ message: "Vacancy not found" });
    }

    return res.status(200).json({ message: "Vacancy updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "SOMETHING WENT WRONG" });
  }
};

export const deleteVacancy = async (req, res) => {
  try {
    const { id } = req.query;

    const result = await vacanciesSchema.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Vacancy not found" });
    }

    return res.status(200).json({ message: "Vacancy deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "SOMETHING WENT WRONG" });
  }
};

export const getVacancyById = async (req, res) => {
  try {
    const { id } = req.query;
    const vacancies = await vacanciesSchema.findById(id);

    if (vacancies.length === 0) {
      return res.status(404).json({ message: "No vacancies found" });
    }

    return res.status(200).json(vacancies);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
