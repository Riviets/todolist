import Todolist from "../components/Todolist";

const TodolistPage = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-zinc-950 to-zinc-800 flex justify-center items-center py-30 px-4 md:px-8 ">
      <Todolist />
    </div>
  );
};

export default TodolistPage;
