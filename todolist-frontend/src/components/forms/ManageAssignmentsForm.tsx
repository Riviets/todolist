import { useForm } from "react-hook-form";
import type { UpdateAssignment } from "../../types/assignment";
import { zodResolver } from "@hookform/resolvers/zod";
import addAssignmentSchema from "../../zod/schemas/addAssignmentSchema";
import { useEffect } from "react";

type ManageAssignmentsFormProps = {
  mode: "add" | "edit";
  defaultValues?: UpdateAssignment;
  onSubmit: (data: UpdateAssignment) => void;
  isLoading?: boolean;
  errors?: any;
};

const ManageAssignmentsForm = ({
  mode,
  defaultValues,
  onSubmit,
  isLoading,
  errors,
}: ManageAssignmentsFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm<UpdateAssignment>({
    resolver: zodResolver(addAssignmentSchema),
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-lg tracking-wider">
          Title
        </label>
        <input
          {...register("title")}
          type="text"
          id="title"
          className="input"
        />
        <div className="min-h-[1.5rem] text-red-500">
          {formErrors.title?.message || errors?.title?.message}
        </div>
      </div>
      <div className="flex flex-col gap-1 mb-5">
        <label htmlFor="appointedDate" className="text-lg tracking-wider">
          Appointed date
        </label>
        <input
          {...register("appointedDate")}
          type="date"
          id="appointedDate"
          className="input"
        />
        <div className="min-h-[1.5rem] text-red-500">
          {formErrors.appointedDate?.message ||
            errors?.appointedDate?.message ||
            errors?.root?.message}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          disabled={isLoading}
          className={`btn !w-[100px] ${isLoading ? "bg-zinc-200" : ""}`}
        >
          {isLoading ? "Hang on" : "Confirm"}
        </button>
      </div>
    </form>
  );
};

export default ManageAssignmentsForm;
