import type { Assignment } from "../types/assignment";
import type { filtersType } from "../types/filters";

export const getFilteredAssignmentsArray = (
  arr: Assignment[],
  filters: filtersType
) => {
  return arr
    ?.slice()
    .filter((assignment) =>
      assignment.title.toLowerCase().includes(filters.title)
    )
    .filter((assignment) => {
      if (filters.dueStatus === "future") {
        return new Date(assignment.appointedDate) > new Date();
      }
      if (filters.dueStatus === "overdue") {
        return new Date(assignment.appointedDate) < new Date();
      } else {
        return true;
      }
    })
    .sort((a, b) => {
      return (
        new Date(a.appointedDate).getTime() -
        new Date(b.appointedDate).getTime()
      );
    });
};
