const express = require('express');
const { register, login } = require('../controller/Authcontroller');
const multer = require('multer');
const multipart = multer();

const router = express.Router();

router.post('/register', multipart.none(), register);
router.post('/login', multipart.none(), login);

module.exports = router;