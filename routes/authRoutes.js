const express = require('express');
const { register, login } = require('../controller/Authcontroller');
const multer = require('multer');
const { admincontroller, adminregistercontroller } = require('../controller/admincontroller');
const { verifyAdminPassword } = require('../controller/confirmpwdcontroller');
const multipart = multer();

const router = express.Router();

router.post('/register', multipart.none(), register);
router.post('/login', multipart.none(), login);
// router.post('/admin', adminregistercontroller)
router.post('/admin', admincontroller)
router.post('/verify-password/:id', verifyAdminPassword)


module.exports = router;