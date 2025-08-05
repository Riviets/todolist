import type { Assignment } from "../types/assignment";

const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
  return (
    <div>
      <p>{assignment.title}</p>
      <p>{assignment.appointedDate}</p>
    </div>
  );
};

export default AssignmentCard;
