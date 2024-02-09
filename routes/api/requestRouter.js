const express = require("express");
const router = express.Router();
const requestCtrl = require("../../controllers/api/requestController");
const { checkToken } = require("../../config/checkToken");

router.post("/", checkToken, requestCtrl.create); //* post a request item

module.exports = router;
