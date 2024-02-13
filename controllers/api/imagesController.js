const AWS = require("aws-sdk");
const log = require("debug")("catneed:controllers:imagesController");
require("dotenv").config();

const s3 = new AWS.S3();

async function uploadToS3(req, res) {
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.file.originalname,
    Body: req.file.buffer,
  };

  s3.upload(params, (err, data) => {
    log("data %o", data);
    if (err) {
      console.error(err);
      return res.status(500).json({ msg: "Error uploading file" });
    }

    res.json({ msg: "File uploaded successfully" });
  });
}

module.exports = { uploadToS3 };
