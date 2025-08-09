import { Link } from "react-router-dom";
import { BurgerIcon } from "../assets/icons/burger";
import { useRef, useState } from "react";
import { BackArrowIcon } from "../assets/icons/backArrow";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navigation = () => {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const sidePanelRef = useRef(null);
  useGSAP(() => {
    if (isSidePanelOpen) {
      gsap.fromTo(
        sidePanelRef.current,
        {
          x: "-100%",
          opacity: 0,
        },
        {
          x: "0%",
          opacity: 1,
          ease: "power2.out",
          duration: 0.2,
        }
      );
    }
  }, [isSidePanelOpen]);

  const handleClosePanel = () => {
    gsap.to(sidePanelRef.current, {
      x: "-100%",
      opacity: 0,
      ease: "power2.out",
      duration: 0.3,
      onComplete: () => setIsSidePanelOpen(false),
    });
  };
  return (
    <>
      <nav className="text-lg font-semibold hidden sm:flex justify-between  md:w-[120px] lg:w-[200px] gap-5">
        <div className="group relative">
          <Link to={"/"}>Tasks</Link>
          <div className="nav-underline" />
        </div>
        <div className="group relative">
          <Link to={"/dashboard"}>Dashboard</Link>
          <div className="nav-underline"></div>
        </div>
      </nav>
      <button
        onClick={() => {
          setIsSidePanelOpen(true);
        }}
        className="block sm:hidden"
      >
        <BurgerIcon />
      </button>
      {isSidePanelOpen && (
        <div
          ref={sidePanelRef}
          className="fixed inset-0 bg-black/90 sm:hidden items-start pt-20 pl-17 z-50"
        >
          <button onClick={handleClosePanel} className="text-white">
            <div className="flex flex-col gap-2 items-start font-medium tracking-wider text-xl">
              <Link to={"/"}>Tasks</Link>
              <Link to={"/dashboard"}>Dashboard</Link>
            </div>
            <div className="absolute top-10 left-8">
              <BackArrowIcon />
            </div>
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;
