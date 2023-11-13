/** @format */

const Middle = async (req, res, next) => {
  try {
    console.log("BODY Client", req.body);
    console.log("URL Client", req.url);
    next();
  } catch (err) {
    console.log(err);
    return res.status(200).json({ err });
  }
};

export default Middle;
