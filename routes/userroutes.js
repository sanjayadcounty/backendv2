const { getAllUsers, createUser, getUserById } = require('../controller/allusercontroller');

express = require('express');
const router = express.Router();


router.get('/',getAllUsers);
router.post('/',createUser);
router.get('/:id',getUserById);



module.exports = router;