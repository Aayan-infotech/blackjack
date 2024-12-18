const express = require('express');
const { signup, login, forgotPassword, verifyOtp, resetPassword } = require('../controllers/authController');
const { getProfile, editProfile, changePassword, deleteAccount } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/otp', verifyOtp);
router.post('/reset-password', resetPassword);

router.get('/profile', getProfile);
router.put('/profile', editProfile);
router.put('/change-password', changePassword);
router.delete('/delete-account',  deleteAccount);

module.exports = router;
