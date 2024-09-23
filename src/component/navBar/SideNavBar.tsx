import logoIcon from "../../assets/logoSmall.png";
import "../../App.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SideNavBar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  let userRoute = ["/UserDashBoard", "/UserDetails"];
  console.log(userRoute.includes(pathname), "pathname data");

  return (
    <>
      <nav
        id="sidenav-1"
        className="z-[1035]  -translate-x-full sidenavbarcolor overflow-hidden  data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800"
        data-te-sidenav-hidden="false"
        data-te-sidenav-position="absolute"
      >
        <ul
          className="relative m-0 list-none px-[0.2rem]"
          data-te-sidenav-menu-ref
        >
          <li className="relative mt-5 mb-5 text-center">
            <a
              className="cursor-pointer items-center text-center"
              data-te-sidenav-link-ref
            >
              <img src={logoIcon} className="mx-auto"></img>
            </a>
          </li>

          <li className="relative mb-2">
            <NavLink
              to="/adminDashBoard"
              className={`flex h-12 cursor-pointer items-center mx-7 px-3 ${
                location.pathname === "/adminDashBoard" ? "active-link" : ""
              }`}
              data-te-sidenav-link-ref
            >
              <i className="bi bi-grid-fill mr-4"></i> DashBoard
            </NavLink>
          </li>

          <li className="relative mb-2">
            <NavLink
              to="/UserDashBoard"
              className={`flex h-12 cursor-pointer items-center mx-7 px-3 ${
                pathname === "/UserDashBoard" || pathname === "/UserDetails"
                  ? "active-link"
                  : ""
              }`}
              data-te-sidenav-link-ref
            >
              <i className="bi bi-people-fill mr-4"></i> User List
            </NavLink>
          </li>

          <li className="relative mb-2">
            <NavLink
              to="/AdminProducts"
              className={`flex h-12 cursor-pointer items-center mx-7 px-3 ${
                location.pathname === "/AdminProducts" ? "active-link" : ""
              }`}
              data-te-sidenav-link-ref
            >
              <i className="bi bi-phone-fill mr-4"></i> Our Products
            </NavLink>
          </li>

          <li className="relative">
            <NavLink
              to="/AddContent"
              className={`flex h-12 cursor-pointer items-center mx-7 px-3 ${
                location.pathname === "/AddContent" ? "active-link" : ""
              }`}
              data-te-sidenav-link-ref
            >
              <i className="fa-solid fa-file-pen mr-4"></i> App Content
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideNavBar;
