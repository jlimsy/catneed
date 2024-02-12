const Request = require("../../models/request");
const log = require("debug")("catneed:controllers:requestController");

async function create(req, res) {
  // extract userId from jwt token
  const userId = req.user._id;
  // log("userId%", req.user._id);

  try {
    log("req.body %o", req.body);

    const requestItem = await Request.create({ ...req.body, user: userId });
    // log("requestItem %o", requestItem);
    return res.json(requestItem);
  } catch (error) {
    return res.status(500).json({ msg: "post to Request item failed" });
  }
}

async function getListings(req, res) {
  try {
    const listings = await Request.find({ user: req.user._id });
    // log("req.user._id %o", req.user._id);
    return res.json(listings);
  } catch (error) {
    res.status(500).json({ msg: "unable to retrieve Request listings" });
  }
}

async function delItem(req, res) {
  const itemId = req.params.itemId;
  try {
    log("itemId %o", itemId);

    const listing = await Request.findOneAndDelete({
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

async function index(req, res) {
  try {
    const all = await Request.find({}).populate("user");
    res.json(all);
  } catch (error) {
    res.status(500).json({ msg: "unable to retrieve requests" });
  }
}
module.exports = { create, getListings, delItem, index };
