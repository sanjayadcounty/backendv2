const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fileName: { type: String, required: true },
  file_url: { type: String, required: true },
  s3Key: { type: String, required: true },
  password: { type: String },
  
  allowedUsers: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UploadFile', fileSchema);