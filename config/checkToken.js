const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  console.log("checkToken middleware");
  const token = req.get("Authorization").split(" ")[1];
  console.log(token);

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const { _id } = decodedToken.user;
    console.log("id", _id), next();
  } catch (error) {
    res.status(403).json({ msg: "wrong token" });
  }

  res.json({ msg: "checkToken" });
};

module.exports = { checkToken };
