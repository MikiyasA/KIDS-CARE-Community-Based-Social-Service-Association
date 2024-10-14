import multer from "multer";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import { getSession } from "next-auth/react";
import { error } from "console";

const prisma = new PrismaClient();

const uploadDir = path.join(process.cwd(), "public/uploads");

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
  const session = await getSession({ req });

  if (req.method === "POST") {
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    upload.single("cover")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed." });
      }

      const { title, detail, createdBy } = req.body;
      const coverUrl = `/uploads/${req.file.filename}`; // Save the new file name in the URL

      const news = await prisma.news.create({
        data: {
          title,
          cover: coverUrl,
          detail,
          createdBy: session.user.id || "guest", // Default to "guest" if not provided
        },
      });

      return res.status(201).json(news);
    });
  } else if (req.method === "GET") {
    const { id } = req.query; // Get the id from query parameters

    if (id) {
      // If an id is provided, get the specific news item
      const newsItem = await prisma.news.findUnique({
        where: { id: id },
      });

      if (!newsItem) {
        return res.status(404).json({ error: "News item not found." });
      }

      return res.json(newsItem);
    } else {
      // Otherwise, get all news items
      const news = await prisma.news.findMany({
        orderBy: [
          { updatedAt: "desc" }, // First, sort by updatedAt in descending order
          { createdAt: "desc" }, // Then, sort by createdAt in descending order if updatedAt is not available
        ],
      });
      return res.json(news);
    }
  } else if (req.method === "PUT") {
    if (!session) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    upload.single("cover")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed." });
      }

      const { id, title, detail } = req.body;
      const coverUrl = req.file ? `/uploads/${req.file.filename}` : undefined; // Use new file name if uploaded

      const updateData = {
        title,
        detail,
        updatedBy: session.user.id || "guest", // Default to "guest"
      };

      if (coverUrl) {
        updateData.cover = coverUrl;
      }

      const news = await prisma.news.update({
        where: { id: id },
        data: updateData,
      });

      return res.status(200).json(news);
    });
  } else if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { id } = req.query;

    // Ensure that the news item exists before deleting
    const existingNews = await prisma.news.findUnique({
      where: { id: id },
    });
    if (!existingNews) {
      return res.status(404).json({ error: "News item not found." });
    }

    await prisma.news.delete({ where: { id: id } });
    return res.status(204).end(); // No content
  } else {
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
