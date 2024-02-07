const express = require("express");
const router = express.Router();
const testCtrl = require("../../controllers/api/testController");

router.post("/", testCtrl.create);

module.exports = router;
