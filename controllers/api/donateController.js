const Donate = require("../../models/donate");
const log = require("debug")("catneed:controllers:donateController");

async function index(req, res) {
  try {
    const allListings = await Donate.find();
    res.json(allListings);
    log("listings %o", allListings);
  } catch (error) {
    res.status(500).json({ msg: "unable to retrieve donate listings" });
  }
}

async function create(req, res) {
  // extract userId from jwt token
  const userId = req.user._id;
  log("userId%", req.user._id);

  try {
    log("req.body %o", req.body);
    // const donateItem = await Donate.create(req.body);
    const donateItem = await Donate.create({ ...req.body, user: userId });
    log("donateItem %o", donateItem);
    res.json(donateItem);
  } catch (error) {
    res.status(500).json({ msg: "post to Donate item failed" });
  }
}

async function getListings(req, res) {
  try {
    const listings = await Donate.find({ user: req.user._id });
    log("req.body._id %o", req.user._id);
    res.json(listings);
    log("listings %o", listings);
  } catch (error) {
    res.status(500).json({ msg: "unable to retrieve donate listings" });
  }
}

module.exports = { create, getListings, index };
