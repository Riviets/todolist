import type { Task } from "../types/task";
import { tasksService } from "../services/api/tasksService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TickIcon } from "../assets/icons/tick";
import { RemoveIcon } from "../assets/icons/remove";

const TaskCard = ({ task }: { task: Task }) => {
  const queryClient = useQueryClient();

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
  });

  const toggleTaskStatus = () => toggleTaskStatusMutation.mutate();
  const removeTask = () => removeTaskMutation.mutate();

  return (
    <div className="flex justify-between py-2 md:py-4 px-4 md:px-8 items-center gap-2 md:gap-4 border-2 shadow-md border-gray-800 rounded-md">
      <button onClick={removeTask} className="cursor-pointer size-6 md:size-10">
        <RemoveIcon />
      </button>
      <p className="text-md sm:text-lg md:text-xl font-medium">{task.title}</p>
      <button
        onClick={toggleTaskStatus}
        className="size-6 sm:size-8 md:size-10 border-2 rounded-md cursor-pointer flex items-center justify-center ml-auto"
      >
        {task.completed ? <TickIcon /> : ""}
      </button>
    </div>
  );
};

export default TaskCard;
