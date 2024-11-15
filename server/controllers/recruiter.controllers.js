const Recruiter = require("../models/recruiter.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const z = require("zod");

const options = {
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

  const recruiterSchema = z.object({
    name: z.string().min(3).max(50),
    email: z.string().email({message: "Invalid email"}),
    password: passwordSchema,
    personInCharge: z.string()
  })

  function getDateComponent() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

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

exports.recruiterSignupHandler = async (req, res) => {
    const {companyName, workEmail, password, designation, username} = req.body;

    try {
        if (!companyName || !workEmail || !password || !designation || !username) {
            return res.status(400).json({message: "Please fill all the fields"});
        }

        const parsed = recruiterSchema.safeParse(req.body);

        if (!parsed.success) {
            const errors = parsed.error.format();
            return res.status(403).json({message: "Invalid data", errors});
        }

        const recruiter = await Recruiter.findOne({
            $or: [{workEmail}, {username}]
        });

        if (recruiter) {
            return res.status(400).json({message: "Recruiter already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const customId = await generateCustomId(Company.collection);
        
        const newRecruiter = await Recruiter.create({
            _id: customId,
            companyName,
            workEmail,
            password: hashedPassword,
            designation,
            username
        })

        const token = jwt.sign({id: newRecruiter._id}, process.env.JWT_SECRET);

        return res.status(201).cookie("token", token, options).json({token, recruiter: newRecruiter});
      } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error creating company profile"});
      }
}

exports.recruiterLoginHandler = async (req, res) => {
    const {workEmail, password} = req.body;

    try {
        if (!workEmail && !password) {
            return res.status(400).json({message: "Please enter email and password"});
        }

        const recuiter = await Recruiter.findOne({$or: [{workEmail}, {username: workEmail}]});

        if (!recuiter) {
            return res.status(400).json({message: "Recuiter does not exist"});
        }

        const isPasswordValid = await bcrypt.compare(password, recuiter.password);

        if (!isPasswordValid) {
            return res.status(400).json({message: "Invalid password"});
        }

        const token = jwt.sign({id: recuiter._id}, process.env.JWT_SECRET);

        return res.status(200).cookie("token", token, options).json({token, recuiter});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error logging in"});
    }
}

exports.searchRecruiter = async (req, res) => {
  const filter = req.query.filter || "";
  try {
      const recruiters = await Recruiter.find({name: {$regex: filter, $options: "i"}}).select("companyName workEmail _id");
      return res.status(200).json({recruiters})
  } catch (error) {
      console.log(error);
      return res.status(500).json({message: "Error fetching recruiters"});
  }
}
