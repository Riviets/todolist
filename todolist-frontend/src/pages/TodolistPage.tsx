import Header from "../components/Header";
import Todolist from "../components/Todolist";

const TodolistPage = () => {
  return (
    <div className="min-h-screen bg-gradient flex justify-center items-center py-10 md:py-30 px-4 md:px-8 ">
      <div className="flex flex-col">
        <Header />
        <Todolist />
      </div>
    </div>
  );
};

export default TodolistPage;
