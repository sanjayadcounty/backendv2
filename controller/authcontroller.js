const User = require('../model/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  // console.log('Auth controller register content-type:', req.headers['content-type']);
  let body = req.body;
  if (typeof body === 'string' && body.trim()) {
    try {
      body = JSON.parse(body);
      console.log('Parsed JSON body for register');
    } catch (e) {
      console.log('Register received raw text body');
    }
  }
  const { username, email, password } = (body && typeof body === 'object') ? body : {};
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

const login = async (req, res) => {
  // console.log('Auth controller login content-type:', req.headers['content-type']);
  let body = req.body;
  if (typeof body === 'string' && body.trim()) {
    try {
      body = JSON.parse(body);
      console.log('Parsed JSON body for login');
    } catch (e) {
      console.log('Login received raw text body');
    }
  }
  const { email, password } = (body && typeof body === 'object') ? body : {};
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'email not found' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'password not correct' });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { register, login };