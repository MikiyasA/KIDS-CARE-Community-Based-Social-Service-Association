import multer from "multer";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
    // Generate a timestamp for the file name
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.]/g, "")
      .slice(0, 14); // Format: YYYYMMDDHHMMSS
    const extension = path.extname(file.originalname); // Get the file extension
    const originalFileName = path.basename(file.originalname, extension); // Get original file name without extension
    const newFileName = `${originalFileName}-${timestamp}${extension}`; // New file name with timestamp
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

      const profilePictureUrl = `/uploads/profile_picture/${req.file.filename}`; // Save the new file name in the URL

      const existingUser = await prisma.user.findUnique({
        where: { email: lowercaseEmail },
      });

      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email: lowercaseEmail,
          password: hashedPassword,
          name,
          address,
          phone,
          profilePicture: profilePictureUrl,
          createdBy: createdBy || "guest", // Default to "guest" if not provided
        },
      });

      return res
        .status(201)
        .json({ message: "User registered successfully", newUser });
    });
  } else if (req.method === "GET") {
    const { id } = req.query; // Get the id from query parameters

    if (id) {
      // If an id is provided, get the specific news item
      const user = await prisma.user.findUnique({
        where: { id: id },
      });

      if (!user) {
        return res.status(404).json({ error: "News item not found." });
      }

      return res.json(user);
    } else {
      // Otherwise, get all news items
      const users = await prisma.user.findMany();
      return res.json(users);
    }
  } else if (req.method === "PUT") {
    upload.single("profilePicture")(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Profile Picture upload failed." });
      }

      const { email, name, address, phone, updatedBy } = req.body;
      const profilePictureUrl = req.file
        ? `/uploads/profile_picture/${req.file.filename}`
        : undefined; // Use new file name if uploaded

      const updateData = {
        email,
        name,
        address,
        phone,
        updatedBy: updatedBy || "guest", // Default to "guest"
      };

      if (profilePictureUrl) {
        updateData.profilePicture = profilePictureUrl;
      }

      const user = await prisma.user.update({
        where: { id: id },
        data: updateData,
      });

      return res.status(200).json(user);
    });
  } else if (req.method === "DELETE") {
    const { id } = req.query;

    // Ensure that the news item exists before deleting
    const existingUser = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found." });
    }

    await prisma.user.delete({ where: { id: id } });
    return res.status(204).end(); // No content
  } else {
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
