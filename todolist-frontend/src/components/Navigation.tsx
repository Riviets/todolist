import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="text-lg font-semibold flex justify-between w-[200px] gap-5">
      <div className="group relative">
        <Link to={"/"}>Tasks</Link>
        <div className="underline" />
      </div>
      <div className="group relative">
        <Link to={"/dashboard"}>Dashboard</Link>
        <div className="underline"></div>
      </div>
    </nav>
  );
};

export default Navigation;
