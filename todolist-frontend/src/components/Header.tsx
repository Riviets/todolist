import { useEffect, useState } from "react";
import type { User } from "../types/user";
import LogoutButton from "../LogoutButton";
import Navigation from "./Navigation";

const Header = () => {
  const [user, setUser] = useState<User | null>();
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userData: User = JSON.parse(userString);
      setUser(userData);
    }
  }, []);
  return (
    <div className="bg-white mb-4 md:mb-8 rounded-sm py-2 md:py-4 px-4 md:px-12 flex items-center justify-between gap-10 w-full max-w-[1000px]">
      <Navigation />
      <div className="flex items-center gap-3 md:gap-5">
        <p className="text-lg md:text-xl font-semibold">{user?.username}</p>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Header;
