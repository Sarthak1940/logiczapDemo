const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const z = require("zod");
const Otp = require("../models/otp.models")
const UserProfile = require("../models/userProfile.models");
const {uploadOnCloudinary} = require("../utils/cloudinary");

const options = {
  expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  httpOnly: true, 
  secure: true,
  sameSite: "None"
}

const passwordSchema = z.string()
  .min(6)
  .max(50)
  .refine(value => /[A-Z]/.test(value), {
    message: "Password must contain at least one uppercase letter.",
  })
  .refine(value => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
    message: "Password must contain at least one special character.",
  }).refine(value => /[0-9]/.test(value), {
    message: "Password must contain at least one number.",
  });

const userSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email({message: "Invalid email"}),
    password: passwordSchema,
    country: z.string(),
    state: z.string(),
    city: z.string(),
    pincode: z.string().length(6),
    phoneNumber: z.string().length(10, {message: "Invalid phone number"})
})

// Helper function to get the date component
function getDateComponent() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// Generate a new custom ID
async function generateCustomId(collection) {
    const dateComponent = getDateComponent();

    // Find the latest serial number for the given date
    const latestDoc = await collection.find({ _id: new RegExp(`^${dateComponent}-`) })
                                      .sort({ _id: -1 })
                                      .limit(1)
                                      .toArray();
    
    let serialNumber = 1;
    if (latestDoc.length > 0) {
        const latestId = latestDoc[0]._id;
        const latestSerial = parseInt(latestId.split('-')[1], 10);
        serialNumber = latestSerial + 1;
    }

    // Format serial number with leading zeros
    const serialComponent = String(serialNumber).padStart(4, '0');
    return `${dateComponent}-${serialComponent}`;
}

exports.sendOtpHandler = async (req, res) => {
    const {email} = req.body;

    try {
        if (!email) {
            return res.status(400).json({message: "Please enter email"});  
        }

        if (!z.string().email().safeParse(email).success) {
            return res.status(400).json({message: "Invalid email", errors});
        }

        const user = await User.findOne({email});

        if (user) {
            return res.status(400).json({message: "User already exist"});  
        }

        const otp = Math.floor(100000 + Math.random() * 900000); 

        await Otp.create({
            email,
            otp
        })

        return res.status(200).json({message: "OTP sent successfully", otp});

    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error sending OTP"});  
    }
}

exports.signupHandler = async (req, res) => {
    const {username, email, password, country, state, city, pincode, phoneNumber, otp} = req.body;

    try {
        if (!username || !email || !password || !country || !state || !city || !pincode || !phoneNumber) {
            return res.status(400).json({message: "Please fill all the fields"});
        }

        if(!otp){
            return res.status(400).json({message: "Please verify email"});
        }
        const parsed = userSchema.safeParse(req.body);

        if (!parsed.success) {
            const errors = parsed.error.format();
            return res.status(403).json({message: "Invalid data", errors});
        }
        
        const existingUser = await User.findOne({
          $or: [{email: email}, {phoneNumber: phoneNumber}, {username: username}]
        })

        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }
        const recentOtp = await Otp.findOne({email}).sort({createdAt: -1}).limit(1);

        if (recentOtp.otp !== otp) {
            return res.status(400).json({message: "Invalid OTP"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const customId = await generateCustomId(User.collection);

        const profile = await UserProfile.create({
            name: "",
            education: [],
            workExperience: [],
            positionsOfResponsibility: [],
            skills: []
        });
        
        const user = await User.create({
          _id: customId,
          username,
          email,
          password: hashedPassword,
          country,
          state,
          city,
          pincode,
          phoneNumber,
          profile: profile._id            
      });

      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

      return res.status(201).cookie("token", token, options).json({message: "User created", user: user, token: token});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error creating user"});
    }
}

exports.loginHandler = async (req, res) => {
    const {email, password} = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({message: "Please fill all the fields"});
        }

        const user = await User.findOne({
            $or: [{email: email}, {username: email}]
        });

        if (!user) {
            return res.status(400).json({message: "User does not exist"});
        }

        
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        return res.status(200).cookie("token", token, options)
        .json({message: "User logged in", user, token: token});
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error logging in"});
    }
}

exports.logoutHandler = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({message: "User logged out"});
    } catch (error) {
        res.status(400).json({message: "Error logging out"});
    }
}

exports.getFullUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("profile");
        return res.status(200).json({user});
    } catch (error) {
        return res.status(400).json({message: "Error getting user"});
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate("profile");
        return res.status(200).json({users});
    } catch (error) {
        return res.status(400).json({message: "Error getting users"});
    }
}

exports.searchUserBySkills = async (req, res) => {
    const {skillNames} = req.body || [];

    if (skillNames.length === 0) {
        return res.status(400).json({message: "Please provide skills"});
    }

    try {
        const matchingProfiles = await UserProfile.find({
            "skills.name": {$all: skillNames}
        });

        const userIds = matchingProfiles.map(profile => profile._id);

        const users = await User.find({profile: {$in: userIds}}).populate("profile");

        return res.status(200).json({message: "Users fetched", users})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error fetching users"});
    }
}

exports.updateProfileImage = async (req, res) => {
    const profileImagePath = req.file?.path;

    try {

        if (!profileImagePath) {
            return res.status(500).json({message: "Please provide image"});
        }

        const image = await uploadOnCloudinary(profileImagePath);

        if (!image.url) {
            return res.status(500).json({message: "Error uploading image"});
        }

        const user = await User.findByIdAndUpdate(req.user._id, {profileImage: image.url}, {new: true}).select("-password");

        return res.status(200).json({message: "Profile image updated", user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error updating profile image"});    
    }
}

exports.updateCoverImage = async (req, res) => {
    const coverImagePath = req.file?.path;

    try {

        if (!coverImagePath) {
            return res.status(500).json({message: "Please provide image"});
        }

        const image = await uploadOnCloudinary(coverImagePath);

        if (!image.url) {
            return res.status(500).json({message: "Error uploading image"});
        }

        const user = await User.findByIdAndUpdate(req.user._id, {coverImage: image.url}, {new: true}).select("-password");

        return res.status(200).json({message: "Cover image updated", user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error updating Cover image"});    
    }
}

exports.getLastSeen = async (req, res) => {
    const {userId} = req.body;
    
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        return res.json({lastSeen: user.lastSeen});
    } catch (error) {
        console.log("Error fetching last seen", error);
        res.status(500).json({message: "Internal server error"})
        
    }
}

