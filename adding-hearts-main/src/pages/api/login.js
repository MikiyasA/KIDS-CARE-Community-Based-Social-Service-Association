import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../models"; // Adjust the import path based on your project structure

const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Find user by username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
        expiresIn: "1h",
      });

      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
