import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { tasksService } from "../services/api/tasksService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const schema = z.object({
  title: z.string().min(1, "This field can't be empty").max(36, "36 chars max"),
});

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
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

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
      <input
        {...register("title")}
        type="text"
        className="border-2 border-zinc-700 w-full rounded-sm md:text-xl py-1 px-2 md:px-4"
      />
      <div className="min-h-[1.5rem] text-red-500">
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      <button className="border-2 border-zinc-700 rounded-sm py-2 text-xl cursor-pointer">
        Submit
      </button>
    </form>
  );
};

export default AddTaskForm;
