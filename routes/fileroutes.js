
const express = require('express');
const router = express.Router();
const { upload, uploadFile, getfileByid } = require('../controller/uploadcontroller');
const UploadFile =  require('../model/uploadfile');


router.post('/', upload.single('file'), uploadFile);
router.get('/', async (req, res) => {
    
    const fileList =  await UploadFile.find();
    res.json(fileList);
});
router.get('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id; // 👈 params.id IS userId
    console.log("User ID:", userId);

    const files = await UploadFile.find({ userId }); // ✅ correct query

    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get('/:id', getfileByid);


module.exports = router;