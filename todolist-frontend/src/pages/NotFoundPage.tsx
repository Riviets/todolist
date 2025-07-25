import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex-center flex-col gap-4 bg-zinc-700 text-white p-4">
      <p className="font-bold text-xl md:text-3xl">
        There is nothing to do here
      </p>
      <button
        onClick={() => navigate("/")}
        className="cursor-pointer border-2 text-lg md:text-xl font-bold px-6 md:px-8 rounded-md text-black bg-white hover:bg-zinc-800 hover:text-white transition-all duration-300"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFoundPage;
