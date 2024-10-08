const User = require('../models/userModel');
const Role = require('../models/roleModel');
const UserToken = require('../models/userTokenModel')
const createError = require('../middleware/error')
const createSuccess = require('../middleware/success')
const jwt = require('jsonwebtoken')
const nodemailer= require('nodemailer')
//to login
const signUp = async (req, res, next) => {
  try {
    const role = await Role.find({ role: 'User' });
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      mobileNumber: req.body.mobileNumber,
      jobTitle:req.body.jobTitle,
      isAdmin: false,
      roles: role
    })
    await newUser.save();
   // return res.status(200).json("User Registered Successfully")
   return next(createSuccess(200, "User Registered Successfully"))
  }
  catch (error) {
    //return res.status(500).send("Something went wrong")
    return next(createError(500, "Something went wrong"))
  }
}
const login = async (req, res, next) => {
  try {
    // Check if the request includes email and password for user login
    if (req.body.email && req.body.password) {
      const user = await User.findOne({ email: req.body.email }).populate("roles", "role");
      if (!user) {
        return next(createError(404, "User Not Found"));
      }
      
   
      const isPasswordCorrect = await User.findOne({ password: req.body.password })
      if (!isPasswordCorrect) {
        return next(createError(404, "Password is Incorrect"));
      }

      
      const token = jwt.sign(
        { id: user._id, isAdmin: false, roles: user.roles },
        process.env.JWT_SECRET
      );

      
      return res.cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          status: 200,
          message: "Login Success",
          data: user
        });
    } 

    //for admin login
    // Check if the request includes username and password for admin login
    else if (req.body.username && req.body.password) {
      const admin = await User.findOne({ username: req.body.username });
      if (!admin) {
        return next(createError(404, "Admin Not Found"));
      }
      
      // Validate password
      const isPasswordCorrect =  await User.findOne({ password: req.body.password })
      if (!isPasswordCorrect) {
        return next(createError(404, "Password is Incorrect"));
      }

      // Generate JWT token for admin
      const token = jwt.sign(
        { id: admin._id, isAdmin: true },
        process.env.JWT_SECRET
      );

      // Send response with token
      return res.cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          status: 200,
          message: "Admin Login Success",
          data: admin
        });
    } else {
      // If neither email/password nor username/password provided
      return next(createError(400, "Invalid login request"));
    }
  } catch (error) {
    // Handle errors
    return next(createError(500, "Something went wrong"));
  }
};


//Register Admin

const registerAdmin = async (req, res, next) => {
  try {
    const role = await Role.find({ role: 'Admin'});
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isAdmin: true,
      roles: role
    })
    await newUser.save();
    //return res.status(200).send("User Registered Successfully")
    return next(createSuccess(200, "Admin Registered Successfully"))
  }
  catch (error) {
    //return res.status(500).send("Something went wrong")
    return next(createError(500, "Something went wrong"))
  }
}

//sendresetmail

const sendEmail = async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } });
if(!user){
  return next(createError(404, "User Not found"))
}
 const payload={
  email:user.email
 }
 const expiryTime = 900;
 const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:expiryTime});
 const newToken = new UserToken({
  userId: user._id,
  token: token
 });
 const mailTransporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"ut.gupta29@gmail.com",
    pass:"yver vjuu fvbb hcot"
   }
 });
 //const resetLink = `http://localhost:4200/reset/${token}`;
 let mailDetails={
  from: "ut.gupta29@gmail.com",
  subject: "Reset Password !",
  to: email,
//  text: `Click the following link to reset your password: ${resetLink}`,
  html: `<html>
  <head>
      <title>Password Reset Request</title>
  </head>
  <body>
      <h1>Password Reset Request</h1>
      <p>Dear ${user.username},</p>
      <p>We have received a request to reset your password for your account with Cleaner Application. To complete the password reset process, please click on the button below:</p>
      <a href=${process.env.LIVE_URL}/reset/${token}><button style="background-color: #4CAF50; color: white; padding: 14px 20px; border: none;
      cursor: pointer; border-radius: 4px;">Reset Password</button></a>
      <p>Please note that this link is only valid for a <b>15 minutes</b>.
      If you did not request a password reset, please ignore this message.</p>
      <p>Thank you,</p>
      <p>Cleaner Application</p>
  </body>
  </html>`,
 };
 mailTransporter.sendMail(mailDetails,async(err,data)=>{
  if(err){
    console.log(err);
    return next(createError(500, "Something went wrong"))
  }
  else{
  console.log("Email sent successfully !!!");
  await newToken.save();
  return next(createSuccess(200, "Email Sent Successfully"))
  }
 });
}

// Reset Password
 const resetPassword = (req, res, next) => {
  const token = req.body.token;
  const newPassword = req.body.password;

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err)
      {
          return next(CreateError(500, "Password Reset Link is Expired!"));
      }
      else
      {
          const response = data;
          const user = await User.findOne({ email: { $regex: '^' + response.email + '$', $options: 'i'}});
          user.password = newPassword;
          try
          {
              const updatedUser = await User.findOneAndUpdate(
              { _id: user._id },
              { $set: user },
              { new: true });
              return next(createSuccess(200, "Password Reset Success!"));
          }
          catch (error)
          {
              return next(createError(500, "Something went wrong while resetting the password!"))
          }
      }
  });
}

module.exports = {
 signUp, login, registerAdmin,sendEmail,resetPassword
}