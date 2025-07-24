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
    <div className="bg-white w-full max-w-[1000px] h-[600px] rounded-sm py-4 md:py-8 px-4 md:px-8 flex flex-col">
      <h1 className="text-center font-bold text-2xl md:text-4xl mb-4 md:mb-8">
        Tasks:
      </h1>
      <div className="flex flex-col gap-3 overflow-y-auto">
        {tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Todolist;
