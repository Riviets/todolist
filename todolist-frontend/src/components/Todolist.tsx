import { tasksService } from "../services/api/tasksService";
import { useQuery } from "@tanstack/react-query";
import TasksList from "./TasksList";
import AddTaskForm from "./AddTaskForm";

const Todolist = () => {
  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksService.getTasks,
  });

  return (
    <div className="bg-white w-full max-w-[1000px] h-[600px] rounded-sm py-4 md:py-8 px-4 md:px-8 flex flex-col relative">
      <h1 className="text-center font-bold text-2xl md:text-4xl mb-4 md:mb-8">
        Task List :)
      </h1>
      <div className="flex gap-12 flex-wrap h-full">
        <div className="md:basis-7/12">
          <TasksList tasks={tasks} />
        </div>
        <div className="md:basis-4/12">
          <AddTaskForm />
        </div>
      </div>
    </div>
  );
};

export default Todolist;
