import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/users", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
