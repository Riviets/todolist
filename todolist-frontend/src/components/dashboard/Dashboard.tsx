import UserAssignments from "./UserAssignments";
import UserAssignmentsForToday from "./UserAssignmentsForToday";

const Dashboard = () => {
  return (
    <div className="h-full w-full md:w-[650px] lg:w-[1000px] bg-white rounded-sm h-full px-5 md:px-10 py-4 md:py-8">
      <h2 className="font-bold text-2xl md:text-3xl mb-8 md:mb-14">
        Dashboard
      </h2>
      <UserAssignmentsForToday />
      <UserAssignments />
    </div>
  );
};

export default Dashboard;
