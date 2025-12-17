
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const s3 = require("./s3Client");

const uploadFile = async (file) => {
  const key = `files/${Date.now()}-${file.originalname}`;

  // Use the environment names present in backendv2/.env
  const bucketName = process.env.CDN77_BUCKET_NAME || process.env.CDN77_BUCKET;
  if (!bucketName) throw new Error('CDN77 bucket name not configured (CDN77_BUCKET_NAME)');

  await s3.send(new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
  }));

  const expires = Math.floor(Date.now() / 1000) + 3600;
  const path = `/${key}`;
  const secret = process.env.CDN77_SECURE_TOKEN_SECRET || process.env.CDN77_SECURE_TOKEN || '';
  const hash = crypto.createHash('md5').update(secret + path + expires).digest('hex');

  const publicUrl = process.env.CDN77_PUBLIC_URL || process.env.CDN77_CDN_URL || '';
  const url = `${publicUrl}${path}?secure=${hash}&expires=${expires}`;

  return {
    fileName: file.originalname,
    size: file.size,
    url: url,
    uploadedAt: new Date().toISOString()
  };
};

module.exports = { uploadFile };