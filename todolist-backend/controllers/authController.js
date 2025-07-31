import { pool } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../services/mailer.js";

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
    res.status(201).json({ username, email });
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

export const getCurrentUser = (req, res) => {
  if (req.session.user) {
    return res.status(200).json(req.session.user);
  }
  res.status(401).json({ message: "Користувач не авторизований" });
};

export const logoutUser = (req, res) => {
  try {
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Вихід успішний" });
    });
  } catch {
    res.status(401).json({ message: "Не вдалося вийти" });
  }
};

export const sendResetPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    if (!user) {
      return res
        .status(400)
        .json({ message: "Користувача з таким email не знайдено" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30min",
    });

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    await transporter.sendMail({
      from: '"Todolist App" <no-reply@demomailtrap.co>',
      to: email,
      subject: "Resetting the password for todolist app",
      html: `
      <p style="font-size: 32px;">Click here to reset the password:</p>
      <a 
        href="${resetLink}" 
        style="font-size: 18px; background-color: #364fbf; color: #ffffff; padding: 10px 15px; text-decoration: none; border-radius: 5px; margin-bottom: 5px"
      >
        Reset
      </a>
      <p style="font-size: 14px;">
        <span style="color: #ff0026;">Warning</span>: the link will expire in 30 minutes
      </p>
    `,
    });
    res.status(200).json({ message: "Лист надіслано" });
  } catch {
    res.status(500).json({ message: "Помилка сервера" });
  }
};

export const resetPassword = (req, res) => {
  try {
  } catch {
    res.status(500).json({ message: "Помилка сервера" });
  }
};
