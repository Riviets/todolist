import { useQuery } from "@tanstack/react-query";
import { assignmentsService } from "../services/api/assignmentsService";
import type { Assignment } from "../types/assignment";
import AssignmentCard from "./AssignmentCard";
import Spinner from "./utils/Spinner";
import AddAssignmentBtn from "./AddAssignmentBtn";
import { useCurrentUserId } from "../hooks/useCurrentUserId";

const UserAssignments = () => {
  const { userId } = useCurrentUserId();
  const {
    data: userAssignments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userAssignments"],
    queryFn: () => assignmentsService.getUserAssignments(userId!),
    enabled: userId !== null,
  });
  return (
    <>
      <div className="flex justify-between">
        <p>Your assignments:</p>
        <AddAssignmentBtn />
      </div>
      <div>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <p className="text-red-500">Sorry, an error occured :(</p>
        ) : userAssignments?.length === 0 ? (
          <p>You don't have any assignments yet</p>
        ) : (
          userAssignments?.map((assignment: Assignment) => (
            <AssignmentCard assignment={assignment} key={assignment.id} />
          ))
        )}
      </div>
    </>
  );
};

export default UserAssignments;
