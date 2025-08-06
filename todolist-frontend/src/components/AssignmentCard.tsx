import type { Assignment } from "../types/assignment";

const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
  return (
    <div className="border-1 rounded-sm shadow-md p-4 d:p-6 h-[150px] flex gap-2 justify-between cursor-pointer hover:scale-[1.03] transition-all duration-300">
      <div className="flex flex-col justify-between">
        <p className="text-xl md:text-2xl font-semibold">{assignment.title}</p>
        <p className="mb-5">{assignment.appointedDate}</p>
      </div>
      <div className="size-12 min-w-12 border-1"></div>
    </div>
  );
};

export default AssignmentCard;
