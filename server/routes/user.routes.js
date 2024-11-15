const express = require('express');
const router =express.Router()
const {signupHandler, loginHandler, logoutHandler, sendOtpHandler, getFullUser, searchUserBySkills, updateProfileImage, updateCoverImage, getAllUsers, getLastSeen} = require("../controllers/user.controllers");
const {verifyjwt} = require("../middleware/auth");
const { resetPasswordToken, resetPassword } = require('../controllers/resetPassword.controllers');
const {upload} = require("../middleware/multer");

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.post("/logout", verifyjwt, logoutHandler);
router.post("/sendOtp", sendOtpHandler);
router.get("/getFullUser", verifyjwt, getFullUser)
router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);
router.post("/searchBySkills", verifyjwt, searchUserBySkills);
router.put("/updateProfileImage", verifyjwt, upload.single("profileImage"), updateProfileImage);
router.put("/updateCoverImage", verifyjwt, upload.single("coverImage"), updateCoverImage);
router.get("/getAllUsers", getAllUsers);
router.post("/lastSeen", verifyjwt, getLastSeen);

  
module.exports = router;