import { useCurrentUserId } from "../hooks/useCurrentUserId";
import { assignmentsService } from "../services/api/assignmentsService";
import type { Assignment } from "../types/assignment";
import AssignmentCard from "./AssignmentCard";
import { useQuery } from "@tanstack/react-query";

const UserAssignmentsForToday = () => {
  const { userId } = useCurrentUserId();
  const { data: assignmentsForToday } = useQuery({
    queryKey: ["userAssignmentsForToday"],
    queryFn: () => assignmentsService.getUserAssignmentsForToday(userId!),
    enabled: userId !== null,
  });
  return (
    <div>
      {assignmentsForToday?.length === 0 ? (
        <p className="text-lg md:text-xl font-medium ml-3 mb-4">
          You have no assignments for today
        </p>
      ) : (
        <>
          <p className="text-lg md:text-xl font-medium ml-3 mb-6">
            Your Assignments for <span className="underline">today:</span>
          </p>
          <div className="flex gap-4 overflow-x-auto p-3 md:p-5 mb-14 shadow-md">
            {assignmentsForToday?.map((assignment: Assignment) => (
              <AssignmentCard
                assignment={assignment}
                className="w-[230px] md:w-[320px] shrink-0"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserAssignmentsForToday;
