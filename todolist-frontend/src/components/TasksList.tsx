import type { Task } from "../types/task";
import TaskCard from "./TaskCard/TaskCard";

type TaskListProps = {
  tasks: Task[] | undefined;
};

const TasksList = ({ tasks }: TaskListProps) => {
  return (
    <div className="flex flex-col gap-3 max-h-[320px] md:max-h-[450px] overflow-y-auto p-2 md:p-4 rounded-sm shadow-2xl w-full">
      {tasks?.length === 0 ? (
        <p className="font-semibold text-lg md:text-xl">No tasks yet...</p>
      ) : (
        tasks?.map((task: Task) => <TaskCard key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TasksList;
