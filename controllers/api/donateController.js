const Donate = require("../../models/donate");

async function create(req, res) {
  // userId
  try {
    console.log("donateController.js | req.body", req.body);
    const donateItem = await Donate.create(req.body);
    console.log("donateController.js | donateItem", donateItem);
    res.json(donateItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "post to Donate item failed" });
  }
}

async function userDonations(req, res) {}

module.exports = { create, userDonations };
