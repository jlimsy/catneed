const express = require("express");
const router = express.Router();
const donateCtrl = require("../../controllers/api/donateController");

// POST /api/donate

router.post("/", donateCtrl.create); //* post an item

//! private access
router.get("/", donateCtrl.userDonations);

module.exports = router;
