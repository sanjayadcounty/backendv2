const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();

const s3Client = new S3Client({
  region: process.env.CDN77_REGION,
  endpoint: process.env.CDN77_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.CDN77_ACCESS_KEY_ID,
    secretAccessKey: process.env.CDN77_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

async function uploadObject({ Bucket, Key, Body, ContentType }) {
  const command = new PutObjectCommand({
    Bucket,
    Key,
    Body,
    ContentType,
  });
  return s3Client.send(command);
}

module.exports = { s3Client, uploadObject };
