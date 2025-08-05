import { useState } from "react";
import AddAssignmentModal from "./AddAssignmentModal";

const AddAssignmentBtn = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsAddModalOpen(!isAddModalOpen)}
        className="cursor-pointer"
      >
        Add
      </button>
      {isAddModalOpen && (
        <AddAssignmentModal closeFn={() => setIsAddModalOpen(false)} />
      )}
    </>
  );
};

export default AddAssignmentBtn;
