const checkAdmin = (req, res, next) => {
  try {
    if (req.body.isAdmin) {
      next();
    }

    if (!req.body.isAdmin) {
      res.status(403).json({ msg: "Unauthorised" });
    }
  } catch (error) {
    res.status(403).json({ msg: "Unauthorised" });
  }
};

module.exports = { checkAdmin };
