import { useState } from "react";
import AddAssignmentModal from "./AddAssignmentModal";

const AddAssignmentBtn = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsAddModalOpen(!isAddModalOpen)}
        className="cursor-pointer border-1 rounded-sm px-2 md:px-4 py-0.5 text-base font-semibold hover:bg-gray-200 transition-all duration-300"
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
