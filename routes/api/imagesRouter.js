const express = require("express");
const multer = require("multer");
const router = express.Router();
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

require("dotenv").config();

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.REGION;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

//s3client
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
  region: REGION,
});

const uploadWithMulter = () =>
  multer({
    storage: multerS3({
      s3: s3,
      bucket: BUCKET_NAME,
      metadata: function (req, file, cb) {
        cb(null, { fieldname: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, file.originalname);
      },
    }),
  }).array("s3Images", 2);

const uploadToAws = (req, res) => {
  const upload = uploadWithMulter();

  upload(req, res, (error) => {
    if (error) {
      res.json({ error, msg: "Error occurred while uploading images." });
      return;
    }
    res.json({ msg: "Files uploaded successfully.", files: req.files });
  });
};

module.exports = router;

router.post("/upload", uploadToAws);
router.get("/", (req, res) => res.send({ mesgg: "meow" }));
