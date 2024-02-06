const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    // console.log(token);

    res.json(token);
  } catch (error) {
    res.status(500).json({ msg: "sign up failed" });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    // Error: User does not exist

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) throw new Error();
    // Error: Incorrect password

    res.json(createJWT(user));
  } catch (error) {
    res.status(500).json({ msg: "log in failed" });
  }
}

async function readProfile(req, res) {
  // console.log("REQUEST", req.body);

  const user = await User.findById(req.body._id);
  res.json(user);
}

async function index(req, res) {
  // console.log("REQUEST", req.body);

  const user = await User.find({});
  res.json(user);
}

async function updatePostal(req, res) {
  const userId = req.user.id;
  const { postalCode } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      postal: postalCode,
    });
    if (!updatedUser) throw new Error();
    // Error: User does not exist

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
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

module.exports = { create, login, readProfile, updatePostal, index };
