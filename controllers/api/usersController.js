const log = require("debug")("catneed:controllers:usersController");
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
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    // Error: User does not exist

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(403).json({ msg: "incorrect password" });
    }
    // Error: Incorrect password

    return res.json(createJWT(user));
  } catch (error) {
    return res.status(500).json({ msg: "log in failed" });
  }
}

//! User access
async function readProfile(req, res) {
  log("req.body %o", req.body);
  const user = await User.findById(req.body._id);
  log("req.body %o", req.body._id);
  return res.json(user);
}

//! Admin-access only
async function index(req, res) {
  const user = await User.find({});
  return res.json(user);
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

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
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
