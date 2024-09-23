import { Outlet } from "react-router-dom";
import SideNavBar from "../navBar/SideNavBar";
import TopNavBar from "../navBar/TopNavBar";

const Commonnavbar = () => {
  return (
    <div className="grid-container grid grid-cols-12">
      <div className=" col-span-2">
        <SideNavBar />
      </div>
      <div className="col-span-10">
        <TopNavBar />
        <Outlet />
      </div>
    </div>
  );
};

export default Commonnavbar;
