const express = require('express');
const { addEducation, addWorkExperience, addSkill, updateEducation, updateWorkExperience, updateSkill, deleteEducation, deleteWorkExperience, deleteSkill, updateProfile, updateName, deleteProject, updateProject, addProject, updateAdditionalDetails, updateSalary, updateAbout } = require('../controllers/userProfile.controllers');
const { verifyjwt } = require('../middleware/auth');
const {upload} = require("../middleware/multer");

const router = express.Router();

// update profile
router.post("/updateProfile", verifyjwt, upload.array("files"), updateProfile);
router.post("/updateAdditionalDetails", verifyjwt, updateAdditionalDetails);
router.post("updateSalary", verifyjwt, updateSalary);
router.post("/updateAbout", verifyjwt, updateAbout);

// creating profile
router.post("/addEducation", verifyjwt, addEducation);
router.post("/addExperience", verifyjwt, addWorkExperience);
router.post("/addProject", verifyjwt, upload.single("image"), addProject);
router.post("/addSkills", verifyjwt, addSkill);

// updating profile
router.post("/updateEducation", verifyjwt, updateEducation);
router.post("/updateExperience", verifyjwt, updateWorkExperience);
router.post("/updateProject", verifyjwt, upload.single("image"), updateProject);
router.post("/updateSkills", verifyjwt, updateSkill);
router.post("/updateName", verifyjwt, updateName);

// delete profile
router.post("/deleteEducation", verifyjwt, deleteEducation);
router.post("/deleteExperience", verifyjwt, deleteWorkExperience);
router.post("/deleteProject", verifyjwt, deleteProject);
router.post("/deleteSkill", verifyjwt, deleteSkill);

module.exports = router;