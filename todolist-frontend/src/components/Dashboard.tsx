import UserAssignments from "./UserAssignments";

const Dashboard = () => {
  return (
    <div className="h-full w-[1000px] bg-white rounded-sm h-full px-5 md:px-10 py-4 md:py-8">
      <h2 className="font-bold text-xl md:text-2xl">Dashboard</h2>
      <UserAssignments />
    </div>
  );
};

export default Dashboard;
