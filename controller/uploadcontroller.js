const multer = require("multer");
const UploadFile = require("../model/uploadfile");
const { uploadObject } = require("../utils/s3Client");


const path = require("path");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
});

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { userId }= req.body;

    // Generate unique key (you can include userId in path if needed)
    const randomHex = crypto.randomBytes(16).toString("hex");
    const ext = path.extname(req.file.originalname);
    const key = `${userId}/${randomHex}${ext}`;

    // Upload to CDN77 Object Storage
    await uploadObject({
      Bucket: process.env.CDN77_BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    });

    const fileUrl = `${process.env.CDN77_PUBLIC_URL}/${key}`;

    // Handle optional password and allowedUsers from request body
    const { password } = req.body;
   
    const newFile = new UploadFile({
      userId: userId,
      fileName: req.file.originalname,
      file_url: fileUrl,
      s3Key: key,
      password: password,
     
    });

    await newFile.save();

    res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "File upload failed", error: error.message });
  }
};

const getfileByid = async (req, res) => {
  try {
    const {id} = req.params;
    
    const file = await UploadFile.findById(id);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { upload, uploadFile, getfileByid };
