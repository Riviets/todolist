import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignmentsService } from "../services/api/assignmentsService";
import type { Assignment, UpdateAssignment } from "../types/assignment";
import { useCurrentUserId } from "../hooks/useCurrentUserId";
import addAssignmentSchema from "../zod/schemas/addAssignmentSchema";

type AddAssignmentModalProps = {
  closeFn: () => void;
};

const AddAssignmentModal = ({ closeFn }: AddAssignmentModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addAssignmentSchema),
  });

  const { userId } = useCurrentUserId();

  const queryClient = useQueryClient();
  const addAssignmentMutation = useMutation({
    mutationFn: (data: Assignment) => assignmentsService.createAssignment(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userAssignments"] }),
  });

  const onSubmit = (data: UpdateAssignment) => {
    if (!userId) return;
    addAssignmentMutation.mutate({
      userId: userId,
      title: data.title,
      appointedDate: data.appointedDate,
    });
    closeFn();
  };
  return (
    <div className="fixed inset-0 bg-black/70 flex-center px-10">
      <div className="bg-white rounded-sm px-4 md:px-8 py-6 md:py-10">
        <p>Add Assignment</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <label htmlFor="title">Title</label>
            <input
              {...register("title")}
              type="text"
              id="title"
              className="input"
            />
            <div className="min-h-[1.5rem] text-red-500">
              {errors.title?.message}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="appointedDate">Appointed date</label>
            <input
              {...register("appointedDate")}
              type="text"
              id="appointedDate"
              className="input"
            />
            <div className="min-h-[1.5rem] text-red-500">
              {errors.appointedDate?.message}
            </div>
          </div>
          <button>Confirm</button>
        </form>
        <button onClick={closeFn}>Close</button>
      </div>
    </div>
  );
};

export default AddAssignmentModal;
