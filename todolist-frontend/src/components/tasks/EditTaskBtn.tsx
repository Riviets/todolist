import { useState } from "react";
import { EditIcon } from "../../assets/icons/edit";
import EditModal from "./EditTaskModal";
import { useTask } from "../TaskCard/TaskContext";

const EditTaskBtn = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const task = useTask();

  return (
    <>
      <button
        onClick={() => setIsEditModalOpen(!isEditModalOpen)}
        className="size-6 sm:size-8 cursor-pointer flex-center"
      >
        <EditIcon />
      </button>
      {isEditModalOpen && (
        <EditModal task={task} setIsModalOpen={setIsEditModalOpen} />
      )}
    </>
  );
};

export default EditTaskBtn;
