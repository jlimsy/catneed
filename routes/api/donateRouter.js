const express = require("express");
const router = express.Router();
const donateCtrl = require("../../controllers/api/donateController");
const { checkToken } = require("../../config/checkToken");

// POST /api/donate

router.get("/", donateCtrl.index); //* browse all donations

//! Protected routes because you don't want public to be able to post to your DB
router.post("/", checkToken, donateCtrl.create); //* post a donate item
router.get("/listings", checkToken, donateCtrl.getListings); //* get all your donations

module.exports = router;
