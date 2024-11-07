import multer from "multer";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";
import User from "../../../models/User";

const uploadDir = path.join(process.cwd(), "public/uploads/profile_picture");

// Create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage with Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.]/g, "")
      .slice(0, 14);
    const extension = path.extname(file.originalname);
    const originalFileName = path.basename(file.originalname, extension);
    const newFileName = `${originalFileName}-${timestamp}${extension}`;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

// API handler
export default async function handler(req, res) {
  if (req.method === "POST") {
    upload.single("profilePicture")(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Profile Picture upload failed." });
      }

      const { email, password, name, address, phone, createdBy } = req.body;
      const lowercaseEmail = email.toLowerCase();

      const profilePictureUrl = `/uploads/profile_picture/${req.file.filename}`;

      try {
        const existingUser = await User.findOne({
          where: { email: lowercaseEmail },
        });
        if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
          email: lowercaseEmail,
          password: hashedPassword,
          name,
          address,
          phone,
          profilePicture: profilePictureUrl,
          status: "New",
          createdBy: createdBy || "guest",
        });

        return res
          .status(201)
          .json({ message: "User registered successfully", newUser });
      } catch (error) {
        return res.status(500).json({ error: "Error creating user" });
      }
    });
  } else if (req.method === "GET") {
    const { id } = req.query;

    try {
      if (id) {
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ error: "User not found." });
        }
        if (user.status == "active") {
          return res.status(404).json({ error: "User is in active." });
        }
        return res.json(user);
      } else {
        const users = await User.findAll();
        return res.json(users);
      }
    } catch (error) {
      return res.status(500).json({ error: "Error fetching users" });
    }
  } else if (req.method === "PUT") {
    upload.single("profilePicture")(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Profile Picture upload failed." });
      }

      const { id, email, name, address, phone, updatedBy } = req.body;
      const profilePictureUrl = req.file
        ? `/uploads/profile_picture/${req.file.filename}`
        : undefined;

      const updateData = {
        email,
        name,
        address,
        phone,
        updatedBy: updatedBy || "guest",
      };

      if (profilePictureUrl) {
        updateData.profilePicture = profilePictureUrl;
      }

      try {
        const user = await User.update(updateData, { where: { id } });
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ error: "Error updating user" });
      }
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const existingUser = await User.findByPk(id);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found." });
      }

      await User.destroy({ where: { id } });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: "Error deleting user" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
