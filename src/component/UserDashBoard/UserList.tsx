import { useNavigate } from "react-router-dom";
import sortingIcon from "../../assets/column-sorting.png";
import ViewIcon from "../../assets/carbon_view.png";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import Pagination from "../Pagination/Pagination";
import NoData from "../NoData/NoData";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import cancelIcon from "../../assets/cancelIcon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Textarea } from "@material-tailwind/react";
interface userListValues {
  id: number;
  full_name: string;
  email: string;
  phone_number: number;
  address: string;
  state_id: number;
  state_name: string;
  district_id: string;
  district_name: string;
  city: string;
  pincode: number;
  device_count: number;
}

interface DataCounts {
  userCount: number;
  userDeleteCount: number;
  productCount: number;
  deviceCount: number;
  userWatcherCount: number;
  userTankerCount: number;
}

const UserList = () => {
  const [userList, setUserList] = useState<userListValues[]>([]);
  const [loader, setLoader] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [maxLength, setmaxLength] = useState(1);
  const [totalItemsOnPage, setTotalItemsOnPage] = useState(1);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const [total, setTotal] = useState(1);
  const [userCount, setUserCount] = useState<DataCounts>();
  const [open, setOpen] = useState(false);
  const [notificationdescription, setNotificationdescription] = useState("");
  const [selectedTabItem, setSelectedTabItem] = useState({
    id: 1,
    name: "Active Users",
    action: true,
    count: userCount?.userCount || 0,
  });
  const cancelButtonRef = useRef(null);

  let navigate = useNavigate();
  const message = "User per page";
  const handleUserDetails = (id: any) => {
    navigate("/UserDetails", { state: { id } });
    handleViewUserIdApi(id);
  };
  const tabData = [
    {
      id: 1,
      name: "Active Users",
      action: true,
      count: userCount?.userCount || 0,
    },
    {
      id: 2,
      name: "Deleted Users",
      action: false,
      count: userCount?.userDeleteCount || 0,
    },
  ];

  const handleViewUserIdApi = async (id: any) => {
    try {
      const apiUrl = ` ${import.meta.env.VITE_APP_BASE_URL}/api/?user_id=${id}`;
      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await dataResponse.json();
      if (data.data && data.data.length === 0) {
        alert("no data found");
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const token = localStorage.getItem("tokenLogin");

  const handleUserList = async () => {
    try {
      const fetch = window.fetch;
      window.fetch = async (...args) => {
        const result = await fetch(...args);
        if (result.status === 500) {
          navigate("/");
        }
        return result;
      };
      var apiUrl = null;
      if (selectedTabItem.id == 1) {
        if (search == "") {
          apiUrl = `${
            import.meta.env.VITE_APP_BASE_URL
          }/api/get_users_list?page=${currentPage}`;
        } else {
          apiUrl = `${
            import.meta.env.VITE_APP_BASE_URL
          }/api/get_users_list?search_key=${search}&page=${currentPage}`;
        }
      } else {
        if (search == "") {
          apiUrl = `${
            import.meta.env.VITE_APP_BASE_URL
          }/api/get_deleted_users_list?page=${currentPage}`;
        } else {
          apiUrl = `${
            import.meta.env.VITE_APP_BASE_URL
          }/api/get_deleted_users_list?search_key=${search}&page=${currentPage}`;
        }
      }

      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await dataResponse.json();
      if (selectedTabItem.id == 1) {
        const newActiveData = data.data;
        setUserList(newActiveData.data);
        const calc = Math.ceil(newActiveData.total / newActiveData.per_page);
        setLastPage(calc);
        setmaxLength(calc);
        setTotalItemsOnPage(newActiveData.data.length);
        setFrom(newActiveData.from);
        setTo(newActiveData.to);
        setTotal(newActiveData.total);
      } else {
        const newDeletedData = data.data.user_data;
        setUserList(newDeletedData.data);
        const calc = Math.ceil(newDeletedData.total / newDeletedData.per_page);
        setLastPage(calc);
        setmaxLength(calc);
        setTotalItemsOnPage(newDeletedData.data.length);
        setFrom(newDeletedData.from);
        setTo(newDeletedData.to);
        setTotal(newDeletedData.total);
      }

      setLoader(true);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleUserCount = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/admin_dashboard`;
      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await dataResponse.json();
      setUserCount(data.data);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };
  const handleAddProduct = () => {
    setOpen(true);
    // setShowIconCountUpload(false);
  };
  const handleAddnotiPop = () => {
    setOpen(false);
  };

  const handleSendNotification = async () => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/bulk_notification_to_all_users`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: notificationdescription }),
      });

      const responseData = await response.json();
      toast.success("Notification sent successfully", {});
      responseData ? setOpen(false) : setOpen(true);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    handleUserList();
  };

  useEffect(() => {
    handleUserList();
    handleUserCount();
  }, [currentPage]);

  useEffect(() => {
    handleUserList();
    handleUserCount();
    setCurrentPage(1);
  }, [selectedTabItem]);

  useEffect(() => {
    if (search == "") {
      handleUserList();
    }
    setCurrentPage(1);
  }, [search]);

  const handleTabClick = (item: any) => {
    setSelectedTabItem(item);
  };

  return (
    <div className="userAdminmain">
      <div className="userAdminSearch">
        <div>
          <form className="flex items-center ml-5 mb-7 mt-5">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none searchBox">
                <i className="fa fa-search" aria-hidden="true"></i>
              </div>
              <input
                value={search}
                onChange={(e) => {
                  if (e.target.value == "") {
                    setSearch("");
                  } else {
                    setSearch(e.target.value);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch(e);
                }}
                type="search"
                id="default-search"
                className="block p-3 w-[280px] h-9 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus-visible:border-0"
                placeholder="Search"
                required
              />
            </div>
          </form>
        </div>
        <div className="text-right mt-5 mr-6">
          <button
            className="text-sm font-medium cursor-pointer uppercase formLoginButton px-6 py-2"
            onClick={handleAddProduct}
          >
            Add Push Notification
          </button>
        </div>

        {userList?.length > 0 && (
          <div className="flex userListMain ml-5 mb-4">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center overflow-y-hidden overflow-x-hidden">
              {tabData.map((item, i) => (
                <li
                  className="self-center text-lg justify-center cursor-pointer mr-14"
                  key={i}
                  onClick={() => handleTabClick(item)}
                >
                  <div
                    className={`flex ${
                      item.id === selectedTabItem.id
                        ? "text-[#133FA0] border-b-2 border-[#133FA0] active font-bold text-sm pb-2"
                        : "font-bold text-sm"
                    }`}
                  >
                    <span>{item.name}</span>
                    <div className="text-xs font-medium userListcount w-6 h-4 rounded-full ml-2 self-center">
                      <span className=" h-4">{item.count}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {loader ? (
        <div className="bg-gray-100">
          {userList?.length > 0 ? (
            <>
              <table className="border-collapse border-none w-full bg-white">
                <thead className="text-transform: uppercase">
                  <tr className="border-b-2 border-gray-100">
                    <th className="text-xs font-medium py-3 px-5 text-left tableth flex">
                      User Name
                      <span>
                        <img src={sortingIcon} className="w-4 h-4"></img>
                      </span>
                    </th>

                    <th className="text-xs font-medium py-3 px-5 text-left tableth">
                      Email
                    </th>
                    <th className="text-xs font-medium py-3 px-5 text-left tableth">
                      Mobile Number
                    </th>
                    {selectedTabItem.action && (
                      <>
                        <th className="text-xs font-medium py-3 px-5 text-left tableth">
                          Devices Count
                        </th>
                        <th className="text-xs font-medium py-3 px-5 text-left tableth">
                          Action
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {userList.map((item, i) => (
                    <tr
                      key={i}
                      className="transition duration-300 ease-in-out hover:bg-gray-100 border-b-2 border-gray-100 py-4 px-5 bg-white text-sm font-medium text-left"
                    >
                      <td className="py-4 px-5  text-sm font-medium contentlable text-left">
                        {item?.full_name}
                      </td>
                      <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletd text-left">
                        {item.email}
                      </td>
                      <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletd text-left">
                        +91 {item.phone_number}
                      </td>
                      {selectedTabItem.action && (
                        <>
                          <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletd text-left">
                            {item.device_count}
                          </td>
                          <td className="text-sm font-medium text-gray-900 py-4 pr-12 whitespace-nowrap tabletd text-center">
                            <div className="cursor-pointer tooltip-container">
                              <img
                                src={ViewIcon}
                                onClick={() => handleUserDetails(item.id)}
                                className="cursor-pointer"
                              />
                              <div className="tooltip px-2">View</div>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                maxLength={maxLength}
                setCurrentPage={setCurrentPage}
                totalItemsOnPage={totalItemsOnPage}
                from={from}
                to={to}
                total={total}
                message={message}
              />
            </>
          ) : (
            <NoData />
          )}
        </div>
      ) : (
        <Loader />
      )}
      <div>
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
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                      <div className="bg-white px-3 py-3 dialogmain">
                        <div className="sm:flex sm:items-start">
                          <div className="absolute top-5 right-5">
                            <img
                              src={cancelIcon}
                              className="items-end cursor-pointer"
                              onClick={handleAddnotiPop}
                            ></img>
                          </div>
                          <div className="mt-3 text-center sm:mt-0 sm:text-left">
                            <Dialog.Title
                              as="h3"
                              className="text-xl font-semibold dialogtitle"
                            >
                              Push Notification
                            </Dialog.Title>
                            <div className="pushNotification">
                              <Textarea
                                className="w-96"
                                placeholder="Message"
                                label="Message"
                                onChange={(e) =>
                                  setNotificationdescription(e.target.value)
                                }
                              />
                            </div>
                            {/* <ToastContainer /> */}
                          </div>
                        </div>
                      </div>
                      <div className="text-center mb-4">
                        <button
                          className="px-12 py-3 uppercase rounded-md text-sm font-medium text-center cursor-pointer formLoginButton"
                          onClick={handleSendNotification}
                        >
                          Send
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserList;
