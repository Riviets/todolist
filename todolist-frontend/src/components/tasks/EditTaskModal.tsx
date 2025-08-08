import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Task } from "../../types/task";
import type { TaskInput } from "../../types/task";
import { inputSchema } from "../../zod/schemas/inputSchema";
import { CloseIcon } from "../../assets/icons/close";
import { tasksService } from "../../services/api/tasksService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type EditModalProps = {
  task: Task;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditTaskModal = ({ task, setIsModalOpen }: EditModalProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      title: task.title,
    },
  });

  const editTaskMutation = useMutation({
    mutationFn: ({ id, taskData }: { id: number; taskData: TaskInput }) => {
      return tasksService.updateTask(id, taskData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsModalOpen(false);
    },
  });

  const onSubmit = (data: { title: string }) => {
    editTaskMutation.mutate({
      id: task.id,
      taskData: {
        title: data.title,
        completed: task.completed,
      },
    });
  };

  return (
    <div className="fixed inset-0 flex-center bg-zinc-900/70 p-5 z-10">
      <div className="bg-white rounded-md px-6 md:px-12 py-4 md:py-8 relative z-10">
        <p className="font-semibold text-lg md:text-2xl text-center mb-3 md:mb-5">
          Edit Task
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title")}
            type="text"
            className="input md:w-full mb-1 md:mb-3"
          />
          <div className="min-h-[1.5rem] mb-1 md:mb-3 text-red-500">
            {errors.title ? (
              <span>{errors.title.message}</span>
            ) : editTaskMutation.isError ? (
              <span>Sorry, an error occured :(</span>
            ) : (
              ""
            )}
          </div>
          <button className="btn">Submit</button>
        </form>
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-5 right-5 cursor-pointer"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default EditTaskModal;
