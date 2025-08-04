import { useState } from "react";
import ConfirmModal from "./components/modals/ConfirmModal";
import { authService } from "./services/api/authService";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-white font-semibold px-3 md:px-5 py-1 cursor-pointer rounded-sm border-2 border-red-700 bg-red-500 hover:bg-red-700 transition-all duration-300"
      >
        Logout
      </button>
      {isModalOpen && (
        <ConfirmModal
          text="Are you sure you want to logout?"
          onConfirm={async () => {
            authService.logout();
            navigate("/login");
          }}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default LogoutButton;
