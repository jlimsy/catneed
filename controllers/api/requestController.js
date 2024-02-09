const Request = require("../../models/request");
const log = require("debug")("catneed:controllers:requestController");

async function create(req, res) {
  // extract userId from jwt token
  log("req.body._id %o", req.body._id);
  try {
    log("req.body %o", req.body);
    const requestItem = await Request.create(req.body);
    log("requestItem %o", requestItem);
    return res.json(requestItem);
  } catch (error) {
    return res.status(500).json({ msg: "post to Request item failed" });
  }
}

module.exports = { create };
