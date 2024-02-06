const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  console.log("checkToken middleware");
  const token = req.get("Authorization").split(" ")[1];
  console.log(token);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.body = decodedToken.user;
    const { _id, isAdmin } = decodedToken.user;
    console.log("req.body:", req.body, "id:", _id, "isAdmin:", isAdmin);
    next();
  } catch (error) {
    res.status(403).json({ msg: "wrong token" });
  }
};

module.exports = { checkToken };
