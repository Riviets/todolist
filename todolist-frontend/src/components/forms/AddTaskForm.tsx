import { useForm } from "react-hook-form";
import { inputSchema } from "../../zod/schemas/inputSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { tasksService } from "../../services/api/tasksService";
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
    <div className="border-1 border-zinc-700 lg:border-none p-3 lg:p-5 rounded-sm shadow-lg">
      <p className="text-center mb-2 md:mb-4 font-semibold text-lg md:text-2xl">
        Add task:
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 max-w-[300px] md:w-full"
      >
        <input {...register("title")} type="text" className="input" />
        <div className="min-h-[1.5rem] text-red-500">
          {errors.title ? (
            <span>{errors.title.message}</span>
          ) : createTaskMutation.isError ? (
            <span>Sorry, an error occured :(</span>
          ) : (
            ""
          )}
        </div>

        <button
          disabled={createTaskMutation.isPending}
          className={`btn ${createTaskMutation.isPending && "bg-zinc-200"}`}
        >
          {createTaskMutation.isPending ? "Hang on..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
