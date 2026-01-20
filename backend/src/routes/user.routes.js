const express = require('express');
const router = express.Router();
const { getUsers, resetPassword } = require('../controllers/userController');

router.get('/', getUsers);
router.put('/:id/password', resetPassword);

module.exports = router;
