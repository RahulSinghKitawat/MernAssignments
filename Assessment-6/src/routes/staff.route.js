const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controller/staffController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);
router.post('/logout', authMiddleware, logout);

module.exports = router;