import { tasksService } from "../services/api/tasksService";
import { useQuery } from "@tanstack/react-query";
import TasksList from "./TasksList";
import AddTaskForm from "./AddTaskForm";
import Spinner from "./utils/Spinner";
import Button from "./buttons/Button";

const Todolist = () => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: tasksService.getTasks,
  });

  return (
    <div className="bg-white w-full max-w-[1000px] max-h-[700px] overflow-y-auto rounded-sm py-4 md:py-8 px-4 md:px-8 flex flex-col relative">
      <h1 className="text-center font-bold text-2xl md:text-4xl mb-4 md:mb-8">
        Task List :)
      </h1>
      <div className="grid grig-cols-1 lg:grid-cols-[7fr_3fr] gap-4 md:gap-12 h-full justify-items-center">
        <div className="order-2 lg:order-1">
          {isLoading ? <Spinner /> : <TasksList tasks={tasks} />}
          {isError && (
            <p className="text-red-500 text-lg md:text-xl mt-3">
              Sorry, an error occured :(
            </p>
          )}
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-between">
          <AddTaskForm />
          <div className="self-end">{/* <Button text="Logout" /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
