const express = require("express");
const router = express.Router();
const donateCtrl = require("../../controllers/api/donateController");

// POST /api/donate

//! Protected routes because you don't want public to be able to post to your DB
router.post("/", donateCtrl.create); //* post an item

//! private access
router.get("/", donateCtrl.userDonations);

module.exports = router;
