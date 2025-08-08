import apiClient from "./adonisAxiosInstance";
import type { TaskInput } from "../../types/task";

export const tasksService = {
  getTasks: async () => {
    const response = await apiClient.get("/tasks");
    return response.data;
  },
  createTask: async (taskData: TaskInput) => {
    const response = await apiClient.post("/tasks", taskData);
    return response.data;
  },
  updateTask: async (taskId: number, taskData: TaskInput) => {
    const response = await apiClient.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },
  deleteTask: async (taskId: number) => {
    const response = await apiClient.delete(`/tasks/${taskId}`);
    return response.data;
  },
};
