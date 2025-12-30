const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../model/User');
const dotenv = require('dotenv');
dotenv.config();

const admincontroller = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'password not correct ' });
    }

    
    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

   

     // 3. Create token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '5h' }
    );

    
    res.cookie('adminToken', token, {
     httpOnly: true,
  secure: false,     
  sameSite: "lax",  
    });

   
    res.json({
      msg: 'Login successful',
      username: user.username,
      role: user.role,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

const adminregistercontroller = async (req, res) => {
    try {   
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword
        });
        await newAdmin.save();
        res.status(201).json({ msg: 'Admin registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

module.exports = { admincontroller , adminregistercontroller};
