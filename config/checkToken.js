const jwt = require("jsonwebtoken");
const log = require("debug")("catneed:config:checkToken");

const checkToken = (req, res, next) => {
  const token = req.get("Authorization").split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.body = decodedToken.user;
    log("req.body %o", req.body);

    const { _id, isAdmin } = decodedToken.user;
    log("decodedToken.user %o", decodedToken.user);
    log("_id %o", _id);

    next();
  } catch (error) {
    res.status(403).json({ msg: "wrong token" });
  }
};

module.exports = { checkToken };
