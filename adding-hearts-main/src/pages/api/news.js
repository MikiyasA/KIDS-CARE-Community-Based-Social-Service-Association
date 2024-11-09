import multer from "multer";
import path from "path";
import fs from "fs";
import { getSession } from "next-auth/react";
import News from "../../../models/News";

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
  const session = await getSession({ req });
  console.log({ session });

  if (req.method === "POST") {
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    upload.single("cover")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ error: "File upload failed." });
      }

      const { title, detail, createdBy } = req.body;
      const coverUrl = `/uploads/${req.file.filename}`;
      let updatedDetail = detail.replace(
        /<img src="data:image\/(png|jpeg|jpg);base64,([^"]+)"/g,
        (match, format, base64Data) => {
          const filename = `${Date.now()}.${format}`;
          const filepath = path.join(
            process.cwd(),
            "public",
            "uploads",
            filename
          );

          // Convert base64 data to binary and save as image file
          const buffer = Buffer.from(base64Data, "base64");
          fs.writeFileSync(filepath, buffer);

          // Generate the URL for the saved image
          const imageUrl = `/uploads/${filename}`;
          return `<img src="${imageUrl}"`; // Replace base64 with file URL in HTML
        }
      );

      try {
        const news = await News.create({
          title,
          cover: coverUrl,
          detail: updatedDetail,
          createdBy: session.user.id || "guest",
        });
        return res.status(201).json(news);
      } catch (error) {
        return res.status(500).json({ error: "Error creating news item" });
      }
    });
  } else if (req.method === "GET") {
    const { id } = req.query;

    try {
      if (id) {
        const newsItem = await News.findByPk(id);
        if (!newsItem) {
          return res.status(404).json({ error: "News item not found." });
        }
        return res.json(newsItem);
      } else {
        const news = await News.findAll({
          order: [
            ["updatedAt", "DESC"],
            ["createdAt", "DESC"],
          ],
        });
        return res.json(news);
      }
    } catch (error) {
      return res.status(500).json({ error: "Error fetching news items" });
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
      const coverUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
      let updatedDetail = detail.replace(
        /<img src="data:image\/(png|jpeg|jpg);base64,([^"]+)"/g,
        (match, format, base64Data) => {
          const filename = `${Date.now()}.${format}`;
          const filepath = path.join(
            process.cwd(),
            "public",
            "uploads",
            filename
          );

          // Convert base64 data to binary and save as image file
          const buffer = Buffer.from(base64Data, "base64");
          fs.writeFileSync(filepath, buffer);

          // Generate the URL for the saved image
          const imageUrl = `/uploads/${filename}`;
          return `<img src="${imageUrl}"`; // Replace base64 with file URL in HTML
        }
      );
      const updateData = {
        title,
        detail: updatedDetail,
        updatedBy: session.user.id || "guest",
      };

      if (coverUrl) {
        updateData.cover = coverUrl;
      }

      try {
        const news = await News.update(updateData, { where: { id } });
        return res.status(200).json(news);
      } catch (error) {
        return res.status(500).json({ error: "Error updating news item" });
      }
    });
  } else if (req.method === "DELETE") {
    if (!session) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { id } = req.query;

    try {
      const existingNews = await News.findByPk(id);
      if (!existingNews) {
        return res.status(404).json({ error: "News item not found." });
      }

      await News.destroy({ where: { id } });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: "Error deleting news item" });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
