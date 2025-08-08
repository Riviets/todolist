import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignmentsService } from "../../services/api/assignmentsService";
import type { Assignment, UpdateAssignment } from "../../types/assignment";
import { useCurrentUserId } from "../../hooks/useCurrentUserId";
import addAssignmentSchema from "../../zod/schemas/addAssignmentSchema";
import { CloseIcon } from "../../assets/icons/close";
import { useEffect } from "react";

type ManageAssignmentModalProps = {
  mode: "add" | "edit";
  assignmentId?: number;
  closeFn: () => void;
};

const ManageAssignmentModal = ({
  mode,
  assignmentId,
  closeFn,
}: ManageAssignmentModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addAssignmentSchema),
  });

  const { userId } = useCurrentUserId();

  const { data: assignmentData, isError } = useQuery({
    queryKey: ["assignment"],
    queryFn: () => assignmentsService.getAssignmentById(assignmentId!),
    enabled: mode === "edit" && assignmentId !== undefined,
  });

  useEffect(() => {
    if (assignmentData && mode === "edit") {
      reset({
        title: assignmentData.title,
        appointedDate: assignmentData.appointedDate,
      });
    } else {
      reset({
        title: "",
        appointedDate: "",
      });
    }
  }, [assignmentData, reset]);

  const queryClient = useQueryClient();
  const addAssignmentMutation = useMutation({
    mutationFn: (data: Assignment) => assignmentsService.createAssignment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAssignments"] });
      queryClient.invalidateQueries({ queryKey: ["userAssignmentsForToday"] });
      closeFn();
    },
    onError: () =>
      setError("root.serverError", {
        type: "500",
        message: "Sorry, an error occured",
      }),
  });

  const editAssignmentMutation = useMutation({
    mutationFn: ({
      assignmentId,
      data,
    }: {
      assignmentId: number;
      data: UpdateAssignment;
    }) => {
      return assignmentsService.updateAssignment(assignmentId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAssignments"] });
      queryClient.invalidateQueries({ queryKey: ["userAssignmentsForToday"] });
      closeFn();
    },
    onError: () =>
      setError("root.serverError", {
        type: "500",
        message: "Sorry, an error occured",
      }),
  });

  const onAddAssignment = (data: UpdateAssignment) => {
    if (!userId) return;
    addAssignmentMutation.mutate({
      userId: userId,
      title: data.title,
      appointedDate: data.appointedDate,
    });
  };

  const onEditAssignment = (data: UpdateAssignment) => {
    if (assignmentId) {
      editAssignmentMutation.mutate({ assignmentId, data });
    }
  };

  const isLoading =
    mode === "add"
      ? addAssignmentMutation.isPending
      : editAssignmentMutation.isPending;

  return (
    <div className="fixed inset-0 bg-black/70 flex-center px-10 z-30">
      <div className="bg-white rounded-sm px-4 md:px-8 py-6 md:py-10 w-full max-w-[375px] relative">
        <p className="text-center text-xl md:text-2xl font-semibold mb-2 md:mb-4">
          {mode === "add" ? "Add Assignment" : "Edit Assignment"}
        </p>
        {isError ? (
          <p className="text-center text-red-500">
            Sorry, can't fetch the assignment data
          </p>
        ) : (
          <form
            onSubmit={
              mode === "add"
                ? handleSubmit(onAddAssignment)
                : handleSubmit(onEditAssignment)
            }
          >
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
                {errors.title?.message}
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
                {errors.appointedDate?.message || errors.root?.message}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                disabled={isLoading}
                className={`btn !w-[100px] ${isLoading && "bg-zinc-200"}`}
              >
                {isLoading ? "Hang on" : "Confirm"}
              </button>
            </div>
          </form>
        )}
        <button
          onClick={closeFn}
          className="absolute top-3 right-4 md:top-5 md:right-6 cursor-pointer"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default ManageAssignmentModal;
