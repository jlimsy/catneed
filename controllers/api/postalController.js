const log = require("debug")("catneed:controllers:postalController");
const Postal = require("../../models/postal");

async function create(req, res) {
  log("req.body %o", req.body);

  try {
    const postal = await Postal.create(req.body);
    log("user %o", postal);
    res.json(postal);
  } catch (error) {
    res.status(500).json({ msg: "sign up failed" });
  }
}

module.exports = { create };
