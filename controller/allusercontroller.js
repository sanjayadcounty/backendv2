const alluser = require("../model/alluser");

 const getAllUsers = async (req, res) => {
  try {
    const users = await alluser.find();
    res.status(200).json(users);
  }
    catch (error) {
    res.status(500).json({ message: "Server error" });
    }
};
const createUser = async (req, res) => {
    try {
        const { fullname, email, mobile, address } = req.body;

        const newUser = new alluser({
            fullname,
            email,
            mobile,
            address
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Create User Error:", error); 
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await alluser.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAllUsers, createUser, getUserById };