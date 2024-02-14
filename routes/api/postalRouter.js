const express = require("express");
const router = express.Router();
const { checkToken } = require("../../config/checkToken");
const postalCtrl = require("../../controllers/api/postalController");

// ===== PROTECTED ROUTES ===== //
router.post("/", checkToken, postalCtrl.create);
router.get("/", checkToken, postalCtrl.getPostal);
router.get("/all", postalCtrl.index);
router.get("/sort", checkToken, postalCtrl.sort);

module.exports = router;
