const express = require('express');
const {signUp,login,registerAdmin,sendEmail,resetPassword} = require('../controllers/authController')

//as User
const router = express.Router();
router.post('/signUp', signUp); // login 
router.post('/login', login);
//as Admin
router.post('/adminRegister', registerAdmin);

//send reset email

router.post('/send-email',sendEmail)

//Reset Password
router.post("/resetPassword", resetPassword);

module.exports = router;