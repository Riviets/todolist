import { tasksService } from "../services/api/tasksService";
import { useQuery } from "@tanstack/react-query";
import type { Task } from "../types/task";
import TaskCard from "./TaskCard";

const Todolist = () => {
  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksService.getTasks,
  });
  return (
    <div className="bg-white w-full max-w-[800px] h-full rounded-sm">
      <div className="m-6">
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Todolist;
