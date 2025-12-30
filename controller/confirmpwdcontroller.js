
const uploadfile = require("../model/uploadfile");

const verifyAdminPassword = async (req, res) => {
  try {
    const { password } = req.body;
   const fileId = req.params.id;
  //  console.log("File ID:", fileId);
    const file = await uploadfile.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    if (password !== file.password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    res.status(200).json({ message: "Password verified" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    }
};


module.exports = { verifyAdminPassword }
