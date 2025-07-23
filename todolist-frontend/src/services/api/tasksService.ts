import apiClient from "./axiosInstance";
import type { TaskInput } from "../../types/task";

export const tasksService = {
  getTasks: async () => {
    const response = await apiClient.get("/");
    return response.data;
  },
  createTask: async (taskData: TaskInput) => {
    const response = await apiClient.post("/", taskData);
    return response.data;
  },
  updateTask: async (taskId: number, taskData: TaskInput) => {
    const response = await apiClient.put(`/${taskId}`, taskData);
    return response.data;
  },
  deleteTask: async (taskId: number) => {
    const response = await apiClient.delete(`/${taskId}`);
    return response.data;
  },
};
