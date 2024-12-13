const UserProfile = require("../models/userProfile.models");
const User = require("../models/user.models");
const {uploadOnCloudinary} = require("../utils/cloudinary");

exports.addEducation = async (req, res) => {
    const { education } = req.body;
    const  id  = req.user.profile;
    try {
        const userProfile = await UserProfile.findOne({_id: id});
        userProfile.education.unshift(education);
        await userProfile.save();
        return res.status(200).json({ message: "Education added successfully" , education: userProfile.education});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error adding education" });
    }
}

exports.addWorkExperience = async (req, res) => {
    const { workExperience } = req.body;
    const  id  = req.user.profile;
    try {
        const userProfile = await UserProfile.findOne({ _id: id });
        const length = userProfile.workExperience.length;
        if (length >= 3) {
            return res.status(400).json({ message: "You can only add 3 work experiences" });
        }
        userProfile.workExperience.unshift(workExperience);
        await userProfile.save();
        return res.status(200).json({ message: "Work experience added successfully" , workExperience: userProfile.workExperience});
    } catch (error) {
        res.status(500).json({ message: "error adding experience" });
    }
}

exports.addProject = async (req, res) => {
    const {project} = req.body;
    const id = req.user.profile;
    const path = req.file?.path;

    try {
        const userProfile = await UserProfile.findOne({_id: id});
        const length = userProfile.projects.length;
        if (length >= 3) {
            return res.status(400).json({message: "You can only add 3 projects"});
        }

        if (path) {
            const uploadedFile = await uploadOnCloudinary(path);
            project.image = uploadedFile.url;
        }
        
        userProfile.projects.unshift(project);
        await userProfile.save();
        return res.status(200).json({message: "Project added successfully", project: userProfile.projects});
    } catch (error) {
        res.status(500).json({message: "error adding project"});
        console.log(error);
    }
}

exports.addSkill = async (req, res) => {
    const { skill } = req.body;
    const  id  = req.user.profile;
    try {
        const userProfile = await UserProfile.findOne({ _id: id });
        userProfile.skills.unshift(skill);
        await userProfile.save();
        return res.status(200).json({ message: "Skill added successfully" , skill: userProfile.skills});
    } catch (error) {
        res.status(500).json({ message: "error adding skill" });
    }
}

exports.updateEducation = async (req, res) => {
    const { education } = req.body;
    const  id  = req.user.profile;
    try {
        const userProfile = await UserProfile.findOne({ _id: id });
        const index = userProfile.education.findIndex(edu => edu._id.toString() === education._id.toString());
        userProfile.education[index] = education;
        await userProfile.save();
        return res.status(200).json({ message: "Education updated successfully" , education: userProfile.education});
    } catch (error) {
        res.status(500).json({ message: "error updating education" });
    }
}

exports.updateWorkExperience = async (req, res) => {
    const { workExperience } = req.body;
    const  id  = req.user.profile;
    try {
        const userProfile = await UserProfile.findOne({ _id: id });
        const index = userProfile.workExperience.findIndex(work => work._id.toString() === workExperience._id.toString());
        userProfile.workExperience[index] = workExperience;
        await userProfile.save();
        return res.status(200).json({ message: "Work experience updated successfully" , workExperience: userProfile.workExperience});
    } catch (error) {
        res.status(500).json({ message: "error updating experience" });
    }
}

exports.updateProject = async (req, res) => {
    const { project } = req.body;
    const path = req.file?.path;
    const  id  = req.user.profile;
    try {
        const userProfile = await UserProfile.findOne({ _id: id });
        const index = userProfile.projects.findIndex(project => project._id.toString() === projects._id.toString());
        if (path) {
            const uploadedFile = await uploadOnCloudinary(path);
            project.image = uploadedFile.url;
        }
        userProfile.projects[index] = project;
        await userProfile.save();
        return res.status(200).json({ message: "Project updated successfully" , project: userProfile.projects});
    } catch (error) {
        res.status(500).json({ message: "error updating project" });
    }
}

exports.updateSkill = async (req, res) => {
    const { skill } = req.body;
    const  id  = req.user.profile;
    try {
        const userProfile = await UserProfile.findOne({ _id: id });
        const index = userProfile.skills.findIndex(sk => sk._id.toString() === skill._id.toString());
        userProfile.skills[index] = skill;
        await userProfile.save();
        return res.status(200).json({ message: "Skill updated successfully" , skill: userProfile.skills});
    } catch (error) {
        res.status(500).json({ message: "error updating skill" });
    }
}

exports.deleteEducation = async (req, res) => {
    const { educationId } = req.body;
    const  id  = req.user.profile;
    try {
        const userProfile = await UserProfile.findOne({ _id: id });
        const index = userProfile.education.findIndex(edu => edu._id.toString() === educationId);
        userProfile.education.splice(index, 1);
        await userProfile.save();
        return res.status(200).json({ message: "Education deleted successfully" , education: userProfile.education});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "error deleting education" });
    }
}

exports.deleteWorkExperience = async (req, res) => {
    const { workExperienceId } = req.body;
    const  id  = req.user.profile;
    try {
        const userProfile = await UserProfile.findOne({ _id: id });

        const index = userProfile.workExperience.findIndex(work => work._id.toString() === workExperienceId);

        userProfile.workExperience.splice(index, 1);

        await userProfile.save();

        return res.status(200).json({ message: "Work experience deleted successfully" , workExperience: userProfile.workExperience});

    } catch (error) {
        res.status(500).json({ message: "error deleting experience" });
    }
}

exports.deleteProject = async (req, res) => {
    const { projectId } = req.body;
    const  id  = req.user.profile;
    try {
        const userProfile = await UserProfile.findOne({ _id: id });

        const index = userProfile.projects.findIndex(project => project._id.toString() === projectId);

        userProfile.projects.splice(index, 1);

        await userProfile.save();

        return res.status(200).json({ message: "Project deleted successfully" , workExperience: userProfile.workExperience});

    } catch (error) {
        res.status(500).json({ message: "error deleting project" });
    }
}

exports.deleteSkill = async (req, res) => {
    const { skillId } = req.body;
    const  id  = req.user.profile;
    try {
        const userProfile = await UserProfile.findOne({ _id: id });

        const index = userProfile.skills.findIndex(sk => sk._id.toString() === skillId);

        userProfile.skills.splice(index, 1);

        return res.status(200).json({ message: "Skill deleted successfully" , skill: userProfile.skills});

    } catch (error) {
        res.status(500).json({ message: "error deleting skill" });
    }
}

exports.updateName = async (req, res) => {
    const {name} = req.body;
    const id = req.user.profile;

    try {
        const profile = await UserProfile.findOneAndUpdate({_id: id}, {name}, {new: true});
        return res.status(200).json({message: "Name updated successfully", profile});
    } catch (error) {
        return res.status(500).json({message: "Error updating name"});
    }
}

exports.updateProfile = async (req, res) => {
    const {name, 
        about } = req.body;
        
    const id = req.user.profile;
    
    try {
        const projects = JSON.parse(req.body.projects || []);
        const skills = JSON.parse(req.body.skills || []);
        const workExperience = JSON.parse(req.body.workExperience || []);
        const education = JSON.parse(req.body.education || []);
        const domain = JSON.parse(req.body.domain || []);
        const languages = JSON.parse(req.body.languages || []);
        const locations = JSON.parse(req.body.locations || []);

        
        const updatedProjects = [];

        for (let i = 0; i < projects.length; i++) {
            const project = typeof projects[i] === 'string' 
                ? JSON.parse(projects[i]) 
                : projects[i];

            const path = req.files[i].path;
            
            let uploadedFile
            if (path) {
                uploadedFile = await uploadOnCloudinary(path);
            }

            updatedProjects.push({
                name: project.projectName,
                description: project.description,
                image: uploadedFile?.url || null
            });
        }
        
        const skillsArray = skills.map(skill => ({skillName: skill}));

        const profile = await UserProfile.findOneAndUpdate({_id: id}, {
            education,
            workExperience,
            skills: skillsArray,
            domain,
            languages,
            locations,
            about, 
            projects: updatedProjects
        }, {new: true});

        await User.findOneAndUpdate({_id: req.user._id}, {
            name,
            isFormFilled: true
        }, {new: true});
        
        return res.status(200).json({message: "Profile updated successfully", profile});
    } catch (error) {
        console.log(error); 
        res.status(500).json({message: "Error updating profile"});
    }
}

exports.updateAdditionalDetails = async (req, res) => {
    const {github, linkedin, portfolio, mail, languages, locations} = req.body;
    const id = req.user.profile;

    try {
        const profile = await UserProfile.findOne({_id: id});
        profile.additionalLinks = {github, linkedin, portfolio, mail};
        profile.languages.push(...languages);
        profile.locations.push(...locations);
        await profile.save();
        return res.status(200).json({message: "Additional details updated successfully", profile});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error updating additional links"});
    }
}

exports.updateSalary = async (req, res) => {
    const {minSalary, maxSalary} = req.body;

    const id = req.user.profile;

    try {
        const profile = await UserProfile.findOneAndUpdate({_id: id}, {
            expectedSalary: {min: minSalary, max: maxSalary}
        }, {new: true});

        return res.status(200).json({message: "Salary updated successfully", profile});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error updating salary"});
    }
}

exports.updateAbout = async (req, res) => {
    const {about} = req.body;
    const id = req.user.profile;

    try {
        await UserProfile.findOneAndUpdate({_id: id}, {about}, {new: true});
        return res.status(200).json({message: "About updated successfully", about});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error updating about"});
    }
}
