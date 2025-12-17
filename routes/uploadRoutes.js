const express = require('express');
const multer = require('multer');
// controller directory is singular `controller` in this project
const { uploadFile } = require('../controller/uploadcontroller');
const protect = require('../middleware/authmiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });  // Store in memory for S3 upload

router.post('/', protect, upload.single('file'), uploadFile);

module.exports = router;