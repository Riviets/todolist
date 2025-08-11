import { useState } from "react";
import ManageAssignmentModal from "./ManageAssignmentModal";
const AddAssignmentBtn = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsAddModalOpen(!isAddModalOpen)}
        className="cursor-pointer border-1 border-zinc-400 rounded-sm px-2 md:px-4 py-0.5 text-base font-semibold hover:bg-gray-200 transition-all duration-300"
      >
        Add
      </button>
      {isAddModalOpen && (
        <ManageAssignmentModal
          mode="add"
          closeFn={() => setIsAddModalOpen(false)}
        />
      )}
    </>
  );
};

export default AddAssignmentBtn;
