import apiClient from "./adonisAxiosInstance";
import type { Assignment, UpdateAssignment } from "../../types/assignment";

export const assignmentsService = {
  getAllAssignments: async () => {
    const response = await apiClient.get("/assignments");
    return response.data;
  },
  getAssignmentById: async (id: number) => {
    const response = await apiClient.get(`/assignments/${id}`);
    return response.data;
  },
  getUserAssignments: async (userID: number) => {
    const response = await apiClient.get(`/users/${userID}/assignments`);
    return response.data;
  },
  getUserAssignmentsForToday: async (userId: number) => {
    const response = await apiClient.get(`users/${userId}/assignments/today`);
    return response.data;
  },
  createAssignment: async (assignmentData: Assignment) => {
    const response = await apiClient.post(`/assignments`, assignmentData);
    return response.data;
  },
  updateAssignment: async (id: number, assignmentData: UpdateAssignment) => {
    const response = await apiClient.put(`/assignments/${id}`, assignmentData);
    return response.data;
  },
  deleteAssignment: async (id: number) => {
    const response = await apiClient.delete(`/assignments/${id}`);
    return response.data;
  },
};
