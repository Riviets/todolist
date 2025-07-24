import type { Task } from "../types/task";
import TaskCard from "./TaskCard";

type TaskListProps = {
  tasks: Task[];
};

const TasksList = ({ tasks }: TaskListProps) => {
  return (
    <div className="flex flex-col gap-3 max-h-[450px] overflow-y-auto">
      {tasks?.map((task: Task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;
