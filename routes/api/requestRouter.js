const express = require("express");
const router = express.Router();
const requestCtrl = require("../../controllers/api/requestController");
const { checkToken } = require("../../config/checkToken");

router.post("/", checkToken, requestCtrl.create); //* post a request item
router.get("/", checkToken, requestCtrl.getListings); //* get user-specific request item
router.delete("/:itemId", checkToken, requestCtrl.delItem);

module.exports = router;
