const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");

//! Router must come after AWS configuration
const { configureAWS } = require("../../config/aws-config");
configureAWS();
const s3 = new AWS.S3();
//! Router must come after AWS configuration

const router = express.Router();
const imagesCtrl = require("../../controllers/api/imagesController");
const log = require("debug")("catneed:pages:imagesRouter");

require("dotenv").config();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

router.post("/upload", upload.single("file"), imagesCtrl.uploadToS3);
router.get("/", (req, res) => res.send({ msg: "meow" }));

module.exports = router;
