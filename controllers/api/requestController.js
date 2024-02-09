const Request = require("../../models/request");
const log = require("debug")("catneed:controllers:requestController");

async function create(req, res) {
  // extract userId from jwt token
  const userId = req.user._id;
  log("userId%", req.user._id);

  try {
    log("req.body %o", req.body);

    const requestItem = await Request.create({ ...req.body, user: userId });
    log("requestItem %o", requestItem);
    return res.json(requestItem);
  } catch (error) {
    return res.status(500).json({ msg: "post to Request item failed" });
  }
}

module.exports = { create };
