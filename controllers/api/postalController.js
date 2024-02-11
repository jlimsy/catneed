const log = require("debug")("catneed:controllers:postalController");
const Postal = require("../../models/postal");
const oneMap = require("../../config/oneMap");
const distance = require("../../config/distance");

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
    res.status(500).json({ msg: "sign up failed" });
  }
}

module.exports = { create };
