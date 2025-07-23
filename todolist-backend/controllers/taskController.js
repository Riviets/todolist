import { pool } from "../db.js";

export const getTasks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера при отриманні задач" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Заголовок задачі обов’язковий" });
    }
    const result = await pool.query(
      "INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *",
      [title, false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера при створенні задачі" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    if (typeof completed !== "boolean" || !title) {
      return res
        .status(400)
        .json({ message: "Неправильні дані для оновлення" });
    }
    const result = await pool.query(
      "UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
      [title, completed, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Задача не знайдена" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера при оновленні задачі" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Задача не знайдена" });
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Помилка сервера при видаленні задачі" });
  }
};
