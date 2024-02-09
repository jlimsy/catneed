const checkAdmin = (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      next();
    }

    if (!req.user.isAdmin) {
      res.status(403).json({ msg: "Unauthorised" });
    }
  } catch (error) {
    res.status(403).json({ msg: "Unauthorised" });
  }
};

module.exports = { checkAdmin };
