import { useQuery } from "@tanstack/react-query";
import { assignmentsService } from "../services/api/assignmentsService";
import type { Assignment } from "../types/assignment";
import AssignmentCard from "./AssignmentCard";
import { useEffect, useState } from "react";
import { authService } from "../services/api/authService";

const UserAssignments = () => {
  const [userId, setUserId] = useState<number | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const user = await authService.getCurrentUser();
      setUserId(user.id);
    };
    getUser();
  }, []);
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
      <p>Your assignments:</p>
      <div>
        {userAssignments?.map((assignment: Assignment) => (
          <AssignmentCard assignment={assignment} key={assignment.id} />
        ))}
      </div>
    </>
  );
};

export default UserAssignments;
