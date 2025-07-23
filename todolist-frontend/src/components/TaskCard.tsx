import type { Task } from "../types/task";
import { tasksService } from "../services/api/tasksService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

  const toggleTaskStatus = () => toggleTaskStatusMutation.mutate();

  return (
    <div className="flex justify-between py-4 px-8 items-center border-2 shadow-md border-gray-800 rounded-md">
      <p className="text-xl font-medium">{task.title}</p>
      <button
        onClick={toggleTaskStatus}
        className="w-10 h-10 border-2 rounded-md cursor-pointer"
      >
        {task.completed ? "+" : ""}
      </button>
    </div>
  );
};

export default TaskCard;
