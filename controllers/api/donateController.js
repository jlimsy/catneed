const Donate = require("../../models/donate");
const Postal = require("../../models/postal");
const log = require("debug")("catneed:controllers:donateController");
const haversine = require("haversine");

async function index(req, res) {
  try {
    const all = await Donate.find({})
      .populate({
        path: "user",
        populate: { path: "postal" },
      })
      .sort({ createdAt: -1 });

    res.json(all);
    log("Donate All %o", all);
    log("AddField %o", all);
  } catch (error) {
    res.status(500).json({ msg: "unable to retrieve donate" });
  }
}

async function getAllWithDist(req, res) {
  try {
    const myPostal = await Postal.findOne({ user: req.user._id });

    const myPostalCoords = {
      latitude: myPostal.lat,
      longitude: myPostal.long,
    };

    const all = await Donate.find({})
      .populate({
        path: "user",
        populate: { path: "postal" },
      })
      .sort({ createdAt: -1 })
      .lean();

    const addDist = all.map((donor) => {
      const donorCoords = {
        latitude: donor.user.postal.lat,
        longitude: donor.user.postal.long,
      };

      donor["distance"] = haversine(myPostalCoords, donorCoords, {
        unit: "km",
      });
      return donor;
    });

    res.json(addDist);
    log("addDist %o", addDist);
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
    const listings = await Donate.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });
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

async function getItemsByCat(req, res) {
  const category = req.query.category;
  log("category", category);
  const itemsByCat = await Donate.find({ category: req.query.category });
  log("req.query.category", req.query.category);
  log("itemsByCat", itemsByCat);
  res.json(itemsByCat);
}

async function getItemsByName(req, res) {
  const name = req.query.name;
  log("name", name);
  log("req.query.name", req.query.name);

  const itemsByName = await Donate.find({
    name: { $regex: new RegExp(req.query.name, "i") },
  });
  res.json(itemsByName);
}

module.exports = {
  create,
  getListings,
  delItem,
  index,
  getAllWithDist,
  getItemsByCat,
  getItemsByName,
};
