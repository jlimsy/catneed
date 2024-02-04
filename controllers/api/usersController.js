const User = require("../../models/user");
const jwt = require("jsonwebtoken");

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    console.log(token);

    res.json(token);
  } catch (error) {
    res.status(400).json(error);
  }
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

module.exports = { create };
