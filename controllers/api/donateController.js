const Donate = require("../../models/donate");
const log = require("debug")("catneed:controllers:donateController");

async function create(req, res) {
  // extract userId from jwt token
  try {
    log("req.body %o", req.body);
    const donateItem = await Donate.create(req.body);
    log("donateItem %o", donateItem);
    res.json(donateItem);
  } catch (error) {
    res.status(500).json({ msg: "post to Donate item failed" });
  }
}

async function index(req, res) {
  try {
    const listings = await Donate.find({ user: req.body._id });
    log("req.body._id %o", req.body._id);
    res.json(listings);
    log("listings %o", listings);
  } catch (error) {
    res.status(500).json({ msg: "unable to retrieve donate listings" });
  }
}

module.exports = { create, index };
