
const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.CDN77_REGION,
  endpoint: process.env.CDN77_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.CDN77_ACCESS_KEY_ID,
    secretAccessKey: process.env.CDN77_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

module.exports = s3;