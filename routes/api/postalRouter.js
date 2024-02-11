const express = require("express");
const router = express.Router();
const { checkToken } = require("../../config/checkToken");
const postalCtrl = require("../../controllers/api/postalController");

// ===== PROTECTED ROUTES ===== //
router.get("/", checkToken, postalCtrl.create);

module.exports = router;
