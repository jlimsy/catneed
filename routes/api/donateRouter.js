const express = require("express");
const router = express.Router();
const donateCtrl = require("../../controllers/api/donateController");
const { checkToken } = require("../../config/checkToken");

// POST /api/donate

//! Protected routes because you don't want public to be able to post to your DB
router.post("/", checkToken, donateCtrl.create); //* post an item
router.get("/", checkToken, donateCtrl.index); //* get all your donations

module.exports = router;
