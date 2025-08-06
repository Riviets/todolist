import { useMemo } from "react";
import type { Assignment } from "../types/assignment";
import { assignmentCardColors } from "../constants/assignmentCardColors";

type AssignmentCardProps = {
  assignment: Assignment;
  className?: string;
};

const AssignmentCard = ({ assignment, className }: AssignmentCardProps) => {
  const cardColors = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * assignmentCardColors.length);
    return assignmentCardColors[randomIndex];
  }, []);

  return (
    <div
      className={`${cardColors.bg} border-2 ${cardColors.border} rounded-sm shadow-md p-4 d:p-6 pl-8 min-h-[150px] flex gap-2 justify-between cursor-pointer hover:scale-[1.03] transition-all duration-300 ${className}`}
    >
      <div className="flex flex-col justify-between">
        <p className="text-xl md:text-2xl font-semibold break-words max-w-[120px] md:max-w-[160px] mb-2">
          {assignment.title}
        </p>
        <p className="mb-5">{assignment.appointedDate}</p>
      </div>
      <div className="size-12 min-w-12 border-1"></div>
    </div>
  );
};

export default AssignmentCard;
