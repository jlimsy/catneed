const log = require("debug")("catneed:controllers:usersController");
const User = require("../../models/user");
const Chat = require("../../models/chat");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function create(req, res) {
  log("user %o", req.body);

  try {
    const user = await User.create(req.body);
    log("user %o", user);

    const token = createJWT(user);
    log("token %o", token);
    res.json(token);
  } catch (error) {
    res.status(500).json({ msg: "sign up failed" });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email }).populate(
      "postal"
    );
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
  const user = await User.findById(req.user._id).populate("postal");
  log("req.body %o", req.user._id);
  return res.json(user);
}

//* ===== CHAT ====== //

//? fetch existing chats in Chat Page
async function getChats(req, res) {
  const sender = req.user._id;

  const existingChats = await Chat.find({ user: sender });
}

//! Admin-access only
async function index(req, res) {
  const user = await User.find({}).populate("postal");
  return res.json(user);
}

async function updatePostal(req, res) {
  const userId = req.user._id;
  log("userId %o", userId);
  // const { postalCode } = req.user.postal;
  log("req.body %o", req.body.postal);

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, {
      postal: req.body.postal,
    });
    if (!updatedUser) {
      return res.status(403).json({ msg: "Forbidden to update postal code" });
    }

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

module.exports = { create, login, readProfile, updatePostal, index, getChats };
