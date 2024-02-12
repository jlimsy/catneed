const Donate = require("../../models/donate");
const log = require("debug")("catneed:controllers:donateController");

async function index(req, res) {
  try {
    const allListings = await Donate.find({}).populate("user");
    res.json(allListings);
    log("listings %o", allListings);
  } catch (error) {
    res.status(500).json({ msg: "unable to retrieve donate" });
  }
}

async function create(req, res) {
  // extract userId from jwt token
  const userId = req.user._id;
  log("userId%", req.user._id);

  try {
    log("req.body %o", req.body);
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

async function delItem(req, res) {
  const itemId = req.params.itemId;
  try {
    log("itemId %o", itemId);

    const listing = await Donate.findOneAndDelete({
      _id: itemId,
      user: req.user._id,
    });
    log("listing %o", listing);

    if (!listing) {
      // If the listing with the specified ID doesn't exist
      return res.status(404).json({ msg: "Listing not found" });
    }

    return res.json({
      msg: "Listing deleted successfully",
      deletedListing: listing,
    });
  } catch (error) {
    res.status(500).json({ msg: "unable to delete Request listing" });
  }
}

module.exports = { create, getListings, delItem, index };
