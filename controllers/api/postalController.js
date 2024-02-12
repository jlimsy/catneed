const log = require("debug")("catneed:controllers:postalController");
const Postal = require("../../models/postal");
const oneMap = require("../../config/oneMap");

async function create(req, res) {
  const userId = req.user._id;

  log("req.body %o", req.body);
  log("req.body.postal %o", req.body.postal);

  const geoCode = await oneMap.getLatLong(req.body.postal);
  log("latLong %o", geoCode);

  try {
    const postal = await Postal.create({
      ...req.body,
      user: userId,
      lat: geoCode.LATITUDE,
      long: geoCode.LONGITUDE,
    });
    log("postal %o", postal);
    res.json(postal);
  } catch (error) {
    res.status(500).json({ msg: "posting postal code failed" });
  }
}

async function getPostal(req, res) {
  log("req.body %o", req.body);
  log("req.body.postal %o", req.body.postal);

  if (!req.user) {
    return res
      .status(404)
      .json({ msg: "User does not have a postal code set" });
  }

  try {
    const postal = await Postal.findOne({ user: req.user._id });
    log("postal %o", postal);

    if (!postal) {
      return res
        .status(404)
        .json({ msg: "Postal code not found for this user" });
    }

    res.json(postal);
  } catch (error) {
    res.status(500).json({ msg: "unable to retrieve postal code" });
  }
}

async function index(req, res) {
  // log("req.body %o", req.body);
  // log("req.body.postal %o", req.body.postal);

  // if (!req.user) {
  //   return res
  //     .status(404)
  //     .json({ msg: "User does not have a postal code set" });
  // }

  try {
    const postal = await Postal.find({}).populate("user");
    log("postal %o", postal);

    if (!postal) {
      return res
        .status(404)
        .json({ msg: "Postal code not found for this user" });
    }

    res.json(postal);
  } catch (error) {
    res.status(500).json({ msg: "unable to retrieve postal code" });
  }
}

module.exports = { create, getPostal, index };
