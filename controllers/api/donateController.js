const Donate = require("../../models/donate");

async function create(req, res) {
  try {
    const donateItem = await Donate.create(req.body);
    console.log("donateController.js", donateItem, req, req.body);
    res.json(donateItem);
  } catch (error) {
    res.status(500).json({ msg: "post to Donate item failed" });
  }
}

async function userDonations(req, res) {}

module.exports = { create, userDonations };
