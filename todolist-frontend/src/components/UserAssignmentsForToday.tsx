import { useEffect, useState } from "react";
import { useCurrentUserId } from "../hooks/useCurrentUserId";
import type { Assignment } from "../types/assignment";
import { assignmentsService } from "../services/api/assignmentsService";
import AssignmentCard from "./AssignmentCard";

const UserAssignmentsForToday = () => {
  const { userId } = useCurrentUserId();
  const [assignmentsForToday, setAssignmentsForToday] = useState<
    Assignment[] | null
  >(null);
  useEffect(() => {
    const setAssignments = async () => {
      if (userId) {
        const assignments = await assignmentsService.getUserAssignmentsForToday(
          userId!
        );
        setAssignmentsForToday(assignments);
      }
    };
    setAssignments();
  }, [userId]);
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
          <div className="flex gap-4 overflow-x-auto p-3 mb-14 shadow-md">
            {assignmentsForToday?.map((assignment) => (
              <AssignmentCard
                assignment={assignment}
                className="min-w-[250px]"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserAssignmentsForToday;
