import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import cancelIcon from "../../assets/cancelIcon.png";
import NoData from "../NoData/NoData";
import DeleteIcon from "../../assets/DeleteIcon.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserDataDetails {
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
}

interface Device {
  id: number;
  serial_no: number;
  users_id: number;
  device_details: string;
  date: string;
  device_name: String;
  device_credits: number;
  payment_proofs: string;
}
const initialState = [{ email: "" }, { phone_number: "" }];

const UserDetailsPage = () => {
  const [userDetail, setUserDetail] = useState<UserDataDetails>();
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const [open, setOpen] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const cancelButtonRef = useRef(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [userid, setUserId] = useState<any>(null);
  const [deviceId, setDeviceId] = useState<any>(null);
  const [devicename, setDeviceName] = useState();
  const [emailEdit, setEmailEdit] = useState(userDetail?.email || "");
  const [mobileNumberEdit, setMobileNumberEdit] = useState("");
  const [validation, setValidation] = useState(initialState);
  const [validationBlank, setValidationBlank] = useState(false);
  const [validationMobile, setValidationMobile] = useState(false);
  const [validationMobileBlank, setValidationMobileBlank] = useState(false);
  const [isDelayOver, setIsDelayOver] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [openDeletePopupDevice, setOpenDeletePopupDevice] = useState(false);
  const [credit, setCredit] = useState(0);
  const [currentCredit, setCurrentCredit] = useState("");
  const [paymentProof, setPaymentProof] = useState([]);
  const [openCredit, setOpenCredit] = useState(false);
  const [creditFile, setCreditFile] = useState({
    name: "",
    file: null as unknown as File,
    imageUrl: "",
  });
  const [creditError, setCreditError] = useState(false);
  const [creditFileError, setCreditFileError] = useState(false);

  const handleDeletePopupDevice = () => {
    setOpenDeletePopupDevice(false);
  };

  const handlePopupDelete = () => {
    setOpenDelete(false);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("tokenLogin");

  const userId = location.state.id;

  const HandleBack = () => {
    navigate("/UserDashBoard");
  };

  const handleEditUserPopup = () => {
    setOpenEdit(false);
    setValidation(initialState);
    setValidationBlank(false);
    setValidationMobile(false);
    setValidationMobileBlank(false);
  };
  const handleDeleteUser = () => {
    setOpen(true);
  };
  const handleEditeUser = () => {
    setOpenEdit(true);
  };

  const handleViewUserIdApi = async (userId: any) => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/get_users_list?user_id=${userId}`;
      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await dataResponse.json();
      if (data.status_code === 200) {
        setUserDetail(data.data);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleUserDevice = async (userId: any) => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/get_devices_by_user?users_id=${userId}`;
      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await dataResponse.json();
      if (data.status_code === 200) {
        setDeviceList(data.data.data);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handledeviceDetete = (
    device_id: any,
    user_id: any,
    device_name: any
  ) => {
    setOpenDelete(true);
    setUserId(user_id);
    setDeviceId(device_id);
    setDeviceName(device_name);
  };

  const handleUserDeviceDelete = async () => {
    try {
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/delete_user_device`;
      const dataResponse = await fetch(apiUrl, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userid, device_id: deviceId }),
      });
      const data = await dataResponse.json();
      if (data.status_code === 200) {
        handleUserDevice(userId);
        setOpenDeletePopupDevice(false);
        handlePopupDelete();
        handleUserDevice(userId);
      } else {
        handlePopupDelete();
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const deletedata = {
    user_id: userDetail?.id,
  };

  const handleDeleteApiCall = async () => {
    if (isDelayOver) {
      try {
        const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/delete_user`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(deletedata),
        });

        const responseData = await response.json();

        if (responseData.status_code === 200) {
          setOpen(false);
          setOpenDeletePopup(false);
          navigate("/UserDashBoard");
          window.location.reload();
        }
        // else if (responseData.status_code === 201) {
        // }
      } catch (error) {
        console.error("Error making API call:", error);
      }
    }
  };

  const editData = {
    user_id: userDetail?.id,
    phone_number: mobileNumberEdit,
    email: emailEdit,
  };

  const handleUserEdit = () => {
    handleEditApiCall();
  };
  const handleEditApiCall = async () => {
    try {
      if (editData?.email === "") {
        setValidationBlank(true);
        return;
      } else if (editData?.phone_number.length > 10) {
        setValidationMobile(true);
        return;
      } else if (editData?.phone_number === "") {
        setValidationMobileBlank(true);
        return;
      }
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/update_user_admin`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      const responseData = await response.json();

      if (responseData.status_code === 200) {
        setOpen(false);
        navigate("/UserDashBoard");
      } else if (responseData.status_code === 201) {
        const errormsg = [
          {
            email: responseData.message.email && responseData.message.email[0],
          },
          {
            phone_number:
              responseData.message.phone_number &&
              responseData.message.phone_number[0],
          },
        ];
        setValidation(errormsg);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const activateYesButton = () => {
    setTimeout(() => {
      setIsDelayOver(true);
    }, 5000);
  };

  useEffect(() => {
    if (openDeletePopup || openDeletePopupDevice) {
      activateYesButton();
      setCountdown(5);
    }
  }, [openDeletePopup || openDeletePopupDevice]);

  useEffect(() => {
    if (!isDelayOver && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isDelayOver, countdown]);

  useEffect(() => {
    handleViewUserIdApi(userId);
    handleUserDevice(userId);
  }, []);

  useEffect(() => {
    if (userDetail?.email) {
      setEmailEdit(userDetail.email);
    }
  }, [userDetail?.email]);

  useEffect(() => {
    if (userDetail?.phone_number) {
      setMobileNumberEdit(userDetail.phone_number.toString());
    }
  }, [userDetail?.phone_number]);

  const hasEmailError = validation.some((user) => user.email);
  const hasPhoneNumberError = validation.some((user) => user.phone_number);

  /* CREDIT */

  const handleOpenCreditPopup = (
    device_id: any,
    credits: any,
    payment_proofs: any
  ) => {
    if (credits === null || credits === undefined) {
      setCurrentCredit("0");
    } else {
      setCurrentCredit(credits);
    }

    setDeviceId(device_id);
    setOpenCredit(true);
    setPaymentProof(payment_proofs);
  };

  const handleCloseCreditPopup = () => {
    setCreditFile({
      name: "",
      file: null as unknown as File,
      imageUrl: "",
    });
    setCredit(0);
    setCreditError(false);
    setCreditFileError(false);
    setDeviceId(null);
    setCurrentCredit("");
    setOpenCredit(false);
  };

  const handleFileChangeIcon = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      const imageObject = {
        name: selectedFile.name,
        file: selectedFile,
        imageUrl: imageUrl,
      };
      setCreditFile(imageObject);
    } else {
      setCreditFile({
        name: "",
        file: null as unknown as File,
        imageUrl: "",
      });
    }
  };

  const handleAddCredit = async () => {
    try {
      if (credit <= 0) {
        setCreditError(true);
      } else if (creditFile.name.length <= 0 && !creditFile.file) {
        setCreditFileError(true);
      } else {
        const formData = new FormData();
        formData.set("device_id", deviceId);
        formData.set("credits", credit.toString());
        formData.append("payment_proof", creditFile?.file);

        const apiUrl = `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/add_credits_to_devices`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const responseData = await response.json();
        if (responseData.status_code === 200) {
          handleUserDevice(userId);
          handleCloseCreditPopup();
          toast.success("Credits added successfully", {});
        } else {
          toast.error(responseData.message, {});
        }
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 place-content-between cursor-pointer mt-4">
        <div
          className="text-xs font-medium userDetailsBack uppercase flex ml-4 flex items-center"
          onClick={HandleBack}
        >
          <div className="position: relative bg-white w-4 h-4 mr-1.5 hover:text-blue-800 flex">
            <i
              className="fa-solid fa-angle-left w-4 h-4 mt-0.5 hover:text-blue-800"
              aria-hidden="true"
            ></i>
            <span className="hover:text-blue-800 ml-2">Back</span>
          </div>
        </div>
      </div>

      <div className="px-4.5 mx-5 my-6 rounded-md ... detailsMainList">
        <div className="grid-container grid grid-cols-12">
          <div className=" col-span-7">
            <div className="text-sm font-normal mb-3 ml-5 mt-4 userdetailsname flex">
              {" "}
              <span>
                <i className="fa fa-user mr-2" aria-hidden="true"></i>
              </span>
              {userDetail?.full_name}
            </div>

            <div className="text-sm font-normal mb-3 ml-5 userdetailsname flex">
              {" "}
              <span>
                <i className="fa fa-envelope mr-2" aria-hidden="true"></i>
              </span>
              {userDetail?.email}
            </div>

            <div className="text-sm font-normal mb-3 ml-5 userdetailsname flex">
              {" "}
              <span>
                <i className="fa fa-mobile mr-2" aria-hidden="true"></i>
              </span>
              +91 {userDetail?.phone_number}
            </div>

            <div className="text-sm font-normal mb-3 ml-5 userdetailsname flex">
              <span>
                <i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
              </span>
              {userDetail?.address}
            </div>
            <div className="text-sm font-normal mb-3 pl-10 mb-4 userdetailsname flex">
              {userDetail?.city},{userDetail?.district_name},
              {userDetail?.state_name}-{userDetail?.pincode}
            </div>
          </div>
          <div className="col-span-5">
            <div className="text-right mt-5 mr-6">
              <button
                className="text-sm font-medium cursor-pointer uppercase formLoginButtonEditUser px-9 py-2 mr-4 focus:outline-none"
                onClick={handleEditeUser}
              >
                Edit user
              </button>
              <button
                className="text-sm font-medium cursor-pointer uppercase formLoginButtonUser px-6 py-2"
                onClick={handleDeleteUser}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
        {deviceList.length > 0 ? (
          <table className="border-collapse border-none w-full bg-white ">
            <thead className="text-transform: uppercase">
              <tr>
                <th className="border-none text-xs font-medium py-3 px-5 text-left tablethdetails">
                  Device Name
                </th>
                <th className="border-none text-xs font-medium py-3 px-5 text-left tablethdetails">
                  Device details
                </th>
                <th className="border-none text-xs font-medium py-3 px-5 text-left tablethdetails">
                  Mac Id
                </th>
                <th className="border-none text-xs font-medium py-3 px-5 text-left tablethdetails">
                  Date
                </th>
                <th className="border-none text-xs font-medium py-3 px-5 text-left tablethdetails">
                  action
                </th>
              </tr>
            </thead>
            {deviceList.map((item, i) => (
              <tbody key={i}>
                <tr className="transition duration-300 ease-in-out hover:bg-gray-100 border-b-4 border-gray-100 py-4 px-5 bg-white text-sm font-medium tabletdname text-left">
                  <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletdname text-left">
                    {item.device_name}
                  </td>
                  <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletdname text-left">
                    {item.device_details}
                  </td>
                  <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletd text-left">
                    {item.serial_no}
                  </td>
                  <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletd text-left">
                    {moment(item.date).format("DD/MM/YYYY")}
                  </td>
                  <td className="text-sm font-medium text-gray-900 py-4 px-5 whitespace-nowrap tabletd text-left">
                    <div className="cursor-pointer tooltip-container">
                      <img
                        src={DeleteIcon}
                        onClick={() =>
                          handledeviceDetete(
                            item.id,
                            item.users_id,
                            item.device_name
                          )
                        }
                        className="ml-2 cursor-pointer"
                      />
                      <div className="tooltip px-2">Delete</div>
                    </div>
                    <div className="cursor-pointer tooltip-container">
                      <button
                        className="font-medium cursor-pointer ml-3 mb-2 firmwareUpdate"
                        onClick={() => {
                          handleOpenCreditPopup(
                            item.id,
                            item.device_credits,
                            item.payment_proofs
                          );
                        }}
                      >
                        Credits (
                        {item.device_credits === null ? 0 : item.device_credits}
                        )
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        ) : (
          <NoData />
        )}
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
                            Delete User
                          </Dialog.Title>
                          <div>
                            <div className="mb-12  mt-9">
                              Are you sure you want to Delete?
                            </div>
                          </div>

                          <div className="flex mt-6">
                            <div className="text-left">
                              <button
                                className="grid mr-2 text-left px-10 py-2 formLoginButton focus:outline-none"
                                onClick={() => {
                                  setOpenDeletePopup(true);
                                }}
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

      {openDeletePopup && (
        <Transition.Root show={openDeletePopup} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpenDeletePopup}
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
                            onClick={() => setOpenDeletePopup(false)}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Delete User
                          </Dialog.Title>
                          <div>
                            <div className="mb-12  mt-9">
                              This will delete all the data related to this User
                            </div>
                          </div>

                          <div className="flex mt-6 justify-center">
                            <div className="text-left">
                              <button
                                className={`grid mr-2 text-left px-10 py-2 ${
                                  !isDelayOver
                                    ? "formLoginButtondelete"
                                    : "formLoginButton"
                                }`}
                                onClick={handleDeleteApiCall}
                                disabled={!isDelayOver}
                              >
                                {isDelayOver
                                  ? "Yes"
                                  : `Wait ${countdown} seconds`}
                              </button>
                            </div>

                            <div className="text-right">
                              <button
                                className="grid ml-2 px-10 py-2 logoutNo"
                                onClick={() => setOpenDeletePopup(false)}
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
      {openEdit && (
        <Transition.Root show={openEdit} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={handleEditUserPopup}
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
                            onClick={handleEditUserPopup}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Edit User
                          </Dialog.Title>
                          <div className="px-3 py-6 modalForm">
                            <div className="mb-6">
                              <label className="text-sm">Full Name</label>
                              <div>
                                <div className="relative rounded-md ">
                                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ml-3 my-3.5 mr-2">
                                    <span className="text-gray-500 sm:text-sm w-3 h-3.5">
                                      <i
                                        className="fa fa-user mr-2"
                                        aria-hidden="true"
                                      ></i>{" "}
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    id="price"
                                    required
                                    className="rounded-md py-1.5 pl-9 pr-2 text-sm searchInput w-80 peer h-10 mt-2"
                                    placeholder="Full Name"
                                    value={userDetail?.full_name}
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mb-6">
                              <label className="mb-2 text-sm">Email</label>
                              <div>
                                <div className="relative rounded-md ">
                                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ml-3 my-3.5 mr-2">
                                    <span className="text-gray-500 sm:text-sm w-3 h-3.5">
                                      <i
                                        className="fa fa-envelope mr-2"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </div>
                                  <input
                                    type="text"
                                    id="price"
                                    required
                                    className={`rounded-md py-1.5 pl-9 pr-2 text-sm searchInput w-80 peer h-10 mt-2 ${
                                      hasEmailError || validationBlank
                                        ? "redFocusBorder"
                                        : ""
                                    }`}
                                    placeholder="Email"
                                    value={emailEdit}
                                    onChange={(e) => {
                                      setEmailEdit(e.target.value);
                                      setValidation(initialState);
                                      setValidationBlank(false);
                                    }}
                                  />
                                  {validation.map((user, index) => (
                                    <div key={index}>
                                      <p className="mt-2 absolute text-pink-600 text-xs">
                                        {user.email || null}
                                      </p>
                                    </div>
                                  ))}
                                  {validationBlank && (
                                    <p className="mt-1 absolute text-pink-600 text-xs">
                                      Email cannot be blank.
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="mb-8">
                              <label className="mb-2 text-sm">
                                Mobile Number
                              </label>
                              <div>
                                <div className="relative rounded-md ">
                                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ml-3 my-3.5 mr-2">
                                    <span className="text-gray-500 sm:text-sm w-3 h-3.5">
                                      <i
                                        className="fa fa-mobile mr-2"
                                        aria-hidden="true"
                                      ></i>{" "}
                                    </span>
                                  </div>

                                  <input
                                    type="number"
                                    id="price"
                                    required
                                    className={`rounded-md py-1.5 pl-9 pr-2 text-sm searchInput w-80 peer h-10 mt-2 ${
                                      hasPhoneNumberError ||
                                      validationMobile ||
                                      validationMobileBlank
                                        ? "redFocusBorder"
                                        : ""
                                    }`}
                                    placeholder="Mobile Number"
                                    value={mobileNumberEdit}
                                    onChange={(e) => {
                                      setMobileNumberEdit(e.target.value);
                                      setValidation(initialState);
                                      setValidationMobile(false);
                                      setValidationMobileBlank(false);
                                    }}
                                  />

                                  {validation.map((user, index) => (
                                    <div key={index}>
                                      <p className="mt-2 absolute text-pink-600 text-xs">
                                        {user.phone_number || null}
                                      </p>
                                    </div>
                                  ))}
                                  {validationMobile && (
                                    <p className="mt-1 absolute text-pink-600 text-xs">
                                      Mobile number should be 10 digits.
                                    </p>
                                  )}
                                  {validationMobileBlank && (
                                    <p className="mt-1 absolute text-pink-600 text-xs">
                                      phone number cannot be blank.
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="mb-6">
                              <div>
                                <div className="relative rounded-md ">
                                  <button
                                    className="w-full py-2 rounded-md text-sm font-medium formLoginButton cursor-pointer uppercase"
                                    onClick={handleUserEdit}
                                  >
                                    Update
                                  </button>
                                </div>
                              </div>
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
      {openDelete && (
        <Transition.Root show={openDelete} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={handlePopupDelete}
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
                            className="items-end cursor-pointer"
                            onClick={handlePopupDelete}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Delete
                          </Dialog.Title>
                          <div>
                            <div className="mb-12  mt-9">
                              Are you sure you want to Delete? {devicename}
                            </div>
                          </div>

                          <div className="flex mt-6 justify-center">
                            <div className="text-left">
                              <button
                                className="grid mr-2 text-left px-10 py-2 formLoginButton focus:outline-none"
                                onClick={() => setOpenDeletePopupDevice(true)}
                              >
                                Yes
                              </button>
                            </div>

                            <div className="text-right">
                              <button
                                className="grid ml-2 px-10 py-2 logoutNo"
                                onClick={handlePopupDelete}
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
      {openDeletePopupDevice && (
        <Transition.Root show={openDeletePopupDevice} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={handleDeletePopupDevice}
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
                            onClick={handleDeletePopupDevice}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-xl font-semibold dialogtitle"
                          >
                            Delete User
                          </Dialog.Title>
                          <div>
                            <div className="mb-12  mt-9">
                              This will delete all the data related to{" "}
                              {devicename} User Device
                            </div>
                          </div>

                          <div className="flex mt-6 justify-center">
                            <div className="text-left">
                              <button
                                className={`grid mr-2 text-left px-10 py-2 ${
                                  !isDelayOver
                                    ? "formLoginButtondelete"
                                    : "formLoginButton"
                                }`}
                                onClick={handleUserDeviceDelete}
                                disabled={!isDelayOver}
                              >
                                {isDelayOver
                                  ? "Yes"
                                  : `Wait ${countdown} seconds`}
                              </button>
                            </div>

                            <div className="text-right">
                              <button
                                className="grid ml-2 px-10 py-2 logoutNo"
                                onClick={handleDeletePopupDevice}
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

      {openCredit && (
        <Transition.Root show={openCredit} as={Fragment}>
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
                  <Dialog.Panel
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all   dialogmain"
                    style={{
                      width: "407px",
                    }}
                  >
                    <div className="bg-white px-3 py-3 dialogmain">
                      <div className="sm:flex sm:items-start">
                        <div className="absolute top-5 right-5 cursor-pointer">
                          <img
                            src={cancelIcon}
                            className="items-end"
                            onClick={handleCloseCreditPopup}
                          ></img>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h2"
                            className="text-xl font-semibold dialogtitle w-24 h-8 mt-2 ml-5"
                          >
                            Add credit
                          </Dialog.Title>
                          <label className="text-sm font-medium mb-2 ml-6 mt-4 dialogtextcolor">
                            Available credit - {currentCredit}
                          </label>

                          <div
                            className="mt-2 flex ml-5"
                            style={{ width: "349px" }}
                          >
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Add credit
                              </label>
                              <input
                                type="number"
                                className={`px-4 py-2 w-full rounded-md ... dialogInput ${
                                  creditError ? "redFocusBorder" : ""
                                }`}
                                placeholder="Enter"
                                value={credit === 0 ? "" : credit}
                                onChange={(e) => {
                                  setCredit(Number(e.target.value));
                                  setCreditError(false);
                                }}
                              ></input>
                            </div>
                          </div>
                          {creditError && (
                            <p className="mt-1 absolute ml-5 text-pink-600 text-xs">
                              Credit should more than 0.
                            </p>
                          )}
                          <div
                            className="mt-2 ml-5 flex"
                            style={{ width: "349px" }}
                          >
                            <div className="grid mt-3.5 w-full">
                              <label className="text-sm font-medium mb-2 dialogtextcolor">
                                Screenshot of the payment
                              </label>
                              <div className="flex">
                                <input
                                  className={`px-2 py-2 mr-2 w-full rounded-md ... dialogInput ${
                                    creditFileError ? "redFocusBorder" : ""
                                  }`}
                                  placeholder="Select image"
                                  value={creditFile.name}
                                  readOnly
                                  style={{
                                    whiteSpace: "pre-line",
                                    lineBreak: "auto",
                                  }}
                                ></input>

                                <input
                                  className="opacity-0 w-0"
                                  id="file_input"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleFileChangeIcon}
                                />

                                <div className="rounded-md p-2 px-2 w-16 formLoginButton">
                                  <label
                                    className="text-sm font-medium text-center formLoginBtnname cursor-pointer"
                                    htmlFor="file_input"
                                  >
                                    Upload
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          {creditFileError && (
                            <p className="mt-1 ml-5 absolute text-pink-600 text-xs">
                              Screenshot of payment is required
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="paymentProofmain">
                      <ul>
                        {paymentProof.map((proof: any, index: any) => (
                          <li key={index}>
                            <a
                              href={proof}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {proof}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-center mb-4 w-full">
                      <button
                        className="px-16 py-3 w-80 mt-2 uppercase rounded-md text-sm font-medium text-center cursor-pointer formLoginButton"
                        onClick={handleAddCredit}
                      >
                        Update
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}

      <ToastContainer />
    </>
  );
};

export default UserDetailsPage;
