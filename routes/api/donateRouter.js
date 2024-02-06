const express = require("express");
const router = express.Router();
const donateCtrl = require("../../controllers/api/donateController");

// POST /api/donates

//* post an item
router.post("/", donateCtrl.create);

//! private access
router.get("/", donateCtrl.userDonations);
