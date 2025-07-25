import { createContext, useContext } from "react";
import type { Task } from "../../types/task";

export const TaskContext = createContext<Task | null>(null);

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskContext.Provider");
  }
  return context;
};
