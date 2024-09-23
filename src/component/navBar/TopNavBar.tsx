import "../../App.css";
import profileicon from "../../assets/profilepic.png";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "../../assets/LogoutIcon.png";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import cancelIcon from "../../assets/cancelIcon.png";

const TopNavBar = () => {
  const [navbarName, setNavBarName] = useState("DashBoard");
  const [open, setOpen] = useState(false);

  let location = useLocation();
  let navigate = useNavigate();
  const cancelButtonRef = useRef(null);
  const token = localStorage.getItem("tokenLogin");

  const handleLogout = () => {
    setOpen(true);
  };

  const handleApiCall = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/admin_logout`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();
      if (responseData.status === true) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  useEffect(() => {
    if (location.pathname === "/UserDashBoard") {
      setNavBarName("User List");
    } else if (location.pathname === "/AdminProducts") {
      setNavBarName("Our Products");
    } else if (location.pathname === "/UserDetails") {
      setNavBarName("User Details");
    } else if (location.pathname === "/adminDashBoard") {
      setNavBarName("DashBoard");
    } else if (location.pathname === "/AddContent") {
      setNavBarName("Add Content");
    } else if (location.pathname === "/AdminProfile") {
      setNavBarName("Profile");
    }
  }, [location.pathname]);

  const handleProfile = () => {
    navigate("/AdminProfile");
  };

  const handleLogoutyes = () => {
    handleApiCall();
  };
  return (
    <div>
      <div className="relative topnavbgcolor">
        <div className="mx-auto max-w-12xl">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-5 md:justify-start md:space-x-10 px-5">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <h2 className="text-2xl font-semibold">{navbarName}</h2>
            </div>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <nav className="hidden space-x-5 justify-end md:flex md:flex-1 lg:w-0">
                <div className="tooltip-container position: relative bg-white w-8 h-8 rounded-full cursor-pointer top-1 ">
                  <img
                    src={profileicon}
                    onClick={handleProfile}
                    className="position: absolute w-3.5 h-4 top-1.5 left-2.5 "
                  />
                  <div className="tooltipLogout px-2">Profile</div>
                </div>

                <div className="tooltip-container position: relative bg-white w-8 h-8 rounded-full cursor-pointer top-1">
                  <img
                    src={LogoutIcon}
                    onClick={handleLogout}
                    className="cursor-pointer position: absolute w-4 h-4 top-2 left-2"
                  ></img>
                  <div className="tooltipLogout px-2">Logout</div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all   dialogmain">
                    <div className="bg-white px-9 py-6 dialogmain">
                      <div className="sm:flex sm:items-start">
                        <div className="absolute top-5 right-5">
                          <img
                            src={cancelIcon}
                            className="items-end"
                            onClick={() => setOpen(false)}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Logout
                          </Dialog.Title>
                          <div>
                            <div className="mb-12  mt-9">
                              Are you sure you want to logout?
                            </div>
                          </div>

                          <div className="flex mt-6">
                            <div className="text-left">
                              <button
                                className="grid mr-2 text-left px-10 py-2 logoutyes focus:outline-none"
                                onClick={handleLogoutyes}
                              >
                                Yes
                              </button>
                            </div>

                            <div className="text-right">
                              <button
                                className="grid ml-2 px-10 py-2 logoutNo"
                                onClick={() => setOpen(false)}
                              >
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
};

export default TopNavBar;
