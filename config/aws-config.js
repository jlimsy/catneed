const AWS = require("aws-sdk");
require("dotenv").config();

const configureAWS = () => {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const REGION = process.env.REGION;
  const ACCESS_KEY = process.env.ACCESS_KEY;
  const SECRET_KEY = process.env.SECRET_KEY;

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: REGION,
  });
};

module.exports = { configureAWS, AWS };
