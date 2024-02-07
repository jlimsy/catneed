const checkAdmin = (req, res, next) => {
  try {
    console.log("checkAdmin", req.body);

    // res.status(403).json({ msg: "Unauthorised" });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkAdmin };
