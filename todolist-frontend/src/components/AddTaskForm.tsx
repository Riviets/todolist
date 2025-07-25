import { useForm } from "react-hook-form";
import { inputSchema } from "../zod/schemas/inputSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { tasksService } from "../services/api/tasksService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type FormData = {
  title: string;
};

const AddTaskForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(inputSchema),
    mode: "onChange",
  });

  const createTaskMutation = useMutation({
    mutationFn: tasksService.createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      reset();
    },
  });

  const onSubmit = (data: FormData) => {
    createTaskMutation.mutate({ title: data.title, completed: false });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <input {...register("title")} type="text" className="input" />
      <div className="min-h-[1.5rem] text-red-500">
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <button className="btn">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
