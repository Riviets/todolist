import { useQuery } from "@tanstack/react-query";
import { assignmentsService } from "../../services/api/assignmentsService";
import type { Assignment } from "../../types/assignment";
import AssignmentCard from "./AssignmentCard";
import Spinner from "../utils/Spinner";
import AddAssignmentBtn from "./AddAssignmentBtn";
import { useCurrentUserId } from "../../hooks/useCurrentUserId";
import Filters from "./Filters";
import { useState } from "react";
import type { filtersType } from "../../types/filters";
import { getFilteredAssignmentsArray } from "../../utils/filterAssignments";

const UserAssignments = () => {
  const { userId } = useCurrentUserId();
  const [filters, setFilters] = useState<filtersType>({
    title: "",
    dueStatus: "all",
  });
  const {
    data: userAssignments,
    isLoading,
    isError,
  } = useQuery<Assignment[]>({
    queryKey: ["userAssignments"],
    queryFn: () => assignmentsService.getUserAssignments(userId!),
    enabled: userId !== null,
    initialData: [],
  });
  const filteredAssignmentsArray = getFilteredAssignmentsArray(
    userAssignments,
    filters
  );
  return (
    <>
      <div className="flex gap-2 justify-between items-center mb-4">
        <p className="text-lg md:text-xl font-medium ml-3">
          All your assignments:
        </p>
        <div className="flex gap-5">
          <Filters filters={filters} setFilters={setFilters} />
          <AddAssignmentBtn />
        </div>
      </div>
      <div>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          <p className="text-red-500">Sorry, an error occured :(</p>
        ) : userAssignments?.length === 0 ? (
          <p>You don't have any assignments yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[190px] md:min-h-[240px] max-h-[320px] overflow-y-auto p-4 shadow-md">
            {filteredAssignmentsArray.length === 0 ? (
              <p className="text-lg text-zinc-700">
                No results for this filter :(
              </p>
            ) : (
              filteredAssignmentsArray.map((assignment: Assignment) => (
                <AssignmentCard assignment={assignment} key={assignment.id} />
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserAssignments;
