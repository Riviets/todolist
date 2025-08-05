import Dashboard from "../components/Dashboard";
import Header from "../components/Header";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient flex flex-col items-center py-5.5 px-4 md:px-8">
      <div className="flex flex-col">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;
