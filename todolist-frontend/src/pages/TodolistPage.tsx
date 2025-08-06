import Header from "../components/Header";
import Todolist from "../components/Todolist";

const TodolistPage = () => {
  return (
    <div className="min-h-screen bg-gradient flex justify-center py-5.5 px-4 md:px-8 w-screen">
      <div className="flex flex-col items-center w-full md:w-[650px] lg:w-[1000px]">
        <Header />
        <Todolist />
      </div>
    </div>
  );
};

export default TodolistPage;
