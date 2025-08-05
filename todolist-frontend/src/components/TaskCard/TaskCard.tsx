import type { Task } from "../../types/task";
import { tasksService } from "../../services/api/tasksService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TickIcon } from "../../assets/icons/tick";
import { RemoveIcon } from "../../assets/icons/remove";
import EditBtn from "../EditTaskBtn";
import { TaskContext } from "./TaskContext";
import { useState } from "react";
import Modal from "../modals/Modal";

const TaskCard = ({ task }: { task: Task }) => {
  const queryClient = useQueryClient();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const toggleTaskStatusMutation = useMutation({
    mutationFn: () =>
      tasksService.updateTask(task.id, {
        title: task.title,
        completed: !task.completed,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const removeTaskMutation = useMutation({
    mutationFn: () => tasksService.deleteTask(task.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      setIsErrorModalOpen(true);
    },
  });

  const toggleTaskStatus = () => toggleTaskStatusMutation.mutate();
  const removeTask = () => removeTaskMutation.mutate();

  return (
    <TaskContext value={task}>
      <div className="flex py-2 md:py-4 px-4 md:px-6 items-center gap-2 md:gap-4 border-2 shadow-md border-gray-800 rounded-md w-full">
        <div className="flex gap-2 mr-2">
          <button
            onClick={removeTask}
            className="size-6 sm:size-8 cursor-pointer flex-center"
          >
            <RemoveIcon />
          </button>
          <EditBtn />
        </div>
        <p className="text-md sm:text-lg md:text-xl font-medium mr-auto">
          {task.title}
        </p>
        <button
          onClick={toggleTaskStatus}
          className="size-6 sm:size-8 md:size-10 cursor-pointer border-2 rounded-md flex-center min-w-6"
        >
          {task.completed && <TickIcon />}
        </button>
        {isErrorModalOpen && (
          <Modal
            title="Error"
            text="Sorry, an error occured"
            closeFunction={() => setIsErrorModalOpen(false)}
          />
        )}
      </div>
    </TaskContext>
  );
};

export default TaskCard;
