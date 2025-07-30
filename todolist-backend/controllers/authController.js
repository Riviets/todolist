import { pool } from "../db.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch {
    res.status(500).json({ message: "Помилка при зчитвуанні користувачів" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );
    res.status(201).json({ username, email, hashedPassword });
  } catch {
    res.status(500).json({ message: "Помилка при реєстрації користувача" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    const user = result.rows[0];
    if (!user) {
      return res
        .status(401)
        .json({ message: "Користувача з таким email не знайдено" });
    }

    const isPasswordalid = await bcrypt.compare(password, user.password);
    if (!isPasswordalid) {
      return res.status(401).json({ message: "Пароль не підходить" });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    res.status(200).json(req.session.user);
  } catch {
    res.status(500).json({ message: "Помилка при вході" });
  }
};
