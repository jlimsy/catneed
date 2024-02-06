const Donate = require("../../models/donate");

async function create(req, res) {
  try {
    const donateItem = await Donate.create(req.body);
  } catch (error) {
    res.status(500).json({ msg: "sign up failed" });
  }
}

async function userDonations(req, res) {}

module.exports = { create, userDonations };
