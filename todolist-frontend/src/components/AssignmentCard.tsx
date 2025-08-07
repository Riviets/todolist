import { useMemo, useState } from "react";
import type { Assignment } from "../types/assignment";
import { assignmentCardColors } from "../constants/assignmentCardColors";
import { EditIcon } from "../assets/icons/edit";
import PushpinIcon from "../assets/icons/pushpin";
import ConfirmModal from "./modals/ConfirmModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignmentsService } from "../services/api/assignmentsService";

type AssignmentCardProps = {
  assignment: Assignment;
  className?: string;
};

const AssignmentCard = ({ assignment, className }: AssignmentCardProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const cardColors = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * assignmentCardColors.length);
    return assignmentCardColors[randomIndex];
  }, []);

  const queryClient = useQueryClient();
  const deleteAssignmentMutation = useMutation({
    mutationFn: () => assignmentsService.deleteAssignment(assignment.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAssignments"] });
      queryClient.invalidateQueries({ queryKey: ["userAssignmentsForToday"] });
      setIsConfirmModalOpen(false);
    },
  });
  const finishAssignment = () => deleteAssignmentMutation.mutate();

  return (
    <>
      <div
        className={`${cardColors.bg} border-2 ${cardColors.border} rounded-sm shadow-md p-4 d:p-6 pl-9 flex flex-col justify-between gap-8 min-h-[150] md:min-h-[200px] relative hover:scale-[1.03] transition-all duration-300 ${className}`}
      >
        <div className="flex flex-col gap-2">
          <p>{assignment.appointedDate}</p>
          <p className="text-lg md:text-xl font-semibold break-words">
            {assignment.title}
          </p>
        </div>
        <div className="space-x-3 self-end">
          <button className="p-1.5 bg-white border-1 border-zinc-500 rounded-full cursor-pointer hover:bg-zinc-100 transolion-all duration-300">
            <EditIcon />
          </button>
          <button
            onClick={() => setIsConfirmModalOpen(true)}
            className="border-1 border-zinc-500 rounded-sm bg-yellow-50 hover:bg-yellow-200 px-2 py-1 text-sm font-medium cursor-pointer transition-all duration-300"
          >
            Finish &#9989;
          </button>
        </div>
        <div className="absolute -top-3 -left-3">
          <PushpinIcon />
        </div>
      </div>
      {isConfirmModalOpen && (
        <ConfirmModal
          text="Are you sure? This assignment is going to be deleted."
          onConfirm={finishAssignment}
          onClose={() => setIsConfirmModalOpen(false)}
        />
      )}
    </>
  );
};

export default AssignmentCard;
