import passwordicon from "../../assets/Vector.png";
import logo from "../../assets/logoAutosGrid.png";
import { useNavigate } from "react-router-dom";
import "react-lite-toast/dist/index.css";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Loader from "../Loader";

const ChangePassword = () => {
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setoldPassword] = useState("");
  const [valdation, setValidation] = useState(false);
  const [valdationNew, setValidationNew] = useState(false);
  const [valdationConfirm, setValidationConfirm] = useState(false);
  const [valdationPassword, setValidationPassword] = useState(false);
  const [valdationOldPass, setValidationOldPass] = useState(false);
  const [valdationpasslength, setValidationPasslength] = useState(false);
  const [valdationoldpasslength, setValidationoldPasslength] = useState(false);
  const [valdationpass, setValidationPass] = useState(false);
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordconfirm, setShowPasswordConfirm] = useState(false);
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  let navigate = useNavigate();

  const token = localStorage.getItem("tokenLogin");
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const formData = {
    old_password: oldPassword,
    password: password,
    password_confirmation: ConfirmPassword,
  };

  const handleChangePasswordApi = async () => {
    const fetch = window.fetch;
    window.fetch = async (...args) => {
      const result = await fetch(...args);

      if (result.status === 500) {
        navigate("/");
      }
      return result;
    };
    try {
      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/change_password`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.status === true) {
        setOpen(true);
        toast.success(responseData.message, {});
        window.location.replace("/");
        localStorage.removeItem("tokenLogin");
      } else {
        if (oldPassword === "") {
          setValidation(true);
          setValidationPasslength(false);
        } else if (oldPassword.length < 6) {
          setValidationoldPasslength(true);
        } else if (password === "") {
          setValidationNew(true);
        } else if (ConfirmPassword === "") {
          setValidationConfirm(true);
        } else if (password.length < 6) {
          setValidationPasslength(true);
        } else if (responseData.status_code === 201) {
          setValidationPassword(true);
        } else if (responseData.status_code === 202) {
          setValidationOldPass(true);
        } else if (responseData.status_code === 203) {
          setValidationPass(true);
        }
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handlechangePass = () => {
    handleChangePasswordApi();
    setValidationOldPass(false);
    setValidationPasslength(false);
    setValidationPassword(false);
    setValidationPass(false);
    setValidation(false);
    setValidationNew(false);
    setValidationConfirm(false);
    setValidationoldPasslength(false);
  };

  const togglePasswordVisibilityOld = () => {
    setShowPasswordOld(!showPasswordOld);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordconfirm);
  };

  return (
    <div className="loginWrap loginWrapNew">
      <div className="grid grid-flow-row grid-cols-2 gap-0">
        <div className=""></div>
        <div className="">
          <div className="loginform passwordForm text-center">
            <div className="text-center logoWrap">
              <img src={logo} />
            </div>

            <div className="forgetpassword mt-5 text-2xl font-medium text-center">
              Change Your Password{" "}
            </div>

            <div className="grid text-left mt-7">
              <div className="text-left formControl">
                <label className="text-sm font-medium mb-2 formLable block">
                  Old Password
                </label>

                <div className="relative rounded-md ">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                      <img src={passwordicon}></img>
                    </span>
                  </div>
                  <input
                    type={showPasswordOld ? "text" : "password"}
                    id="price"
                    required
                    className={`pl-8 rounded-md .. py-1.5 pl-7 pr-2 searchInput  w-full ${
                      valdationOldPass ||
                      valdation ||
                      valdationpass ||
                      valdationoldpasslength
                        ? "redFocusBorder"
                        : ""
                    }`}
                    placeholder="Enter"
                    value={oldPassword}
                    onChange={(e) => {
                      setoldPassword(e.target.value);
                      setValidationNew(false);
                      setValidationPasslength(false);
                      setValidationPassword(false);
                      setValidationPass(false);
                      setValidationOldPass(false);
                      setValidation(false);
                      setValidationoldPasslength(false);
                    }}
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={togglePasswordVisibilityOld}
                  >
                    <span className="text-gray-500 sm:text-sm">
                      {showPasswordOld ? (
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      ) : (
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      )}
                    </span>
                  </div>
                  {valdationOldPass && (
                    <p className="mt-1 absolute text-pink-600 text-xs">
                      Old password not match!
                    </p>
                  )}
                  {valdationoldpasslength && (
                    <p className="mt-1 absolute text-pink-600 text-xs">
                      Old password field must be at least 6 characters.
                    </p>
                  )}
                  {valdation && (
                    <p className="mt-1 absolute text-pink-600 text-xs">
                      Old Password cannot be blank.
                    </p>
                  )}
                </div>
              </div>

              <div className="text-left formControl">
                <label className="text-sm font-medium mb-2 formLable block">
                  New Password
                </label>

                <div className="relative rounded-md ">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                      <img src={passwordicon}></img>
                    </span>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="price"
                    required
                    className={`pl-8 rounded-md .. py-1.5 pl-7 pr-2 searchInput  w-full ${
                      valdationNew ||
                      valdationpass ||
                      valdationPassword ||
                      valdationpasslength
                        ? "redFocusBorder"
                        : ""
                    }`}
                    placeholder="Enter"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setValidationNew(false);
                      setValidationPasslength(false);
                      setValidationPassword(false);
                      setValidationPass(false);
                      setValidationOldPass(false);
                      setValidation(false);
                    }}
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <span className="text-gray-500 sm:text-sm">
                      {showPassword ? (
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      ) : (
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      )}
                    </span>
                  </div>
                  {valdationNew && (
                    <p className="mt-1 absolute text-pink-600 text-xs">
                      Password cannot be blank.
                    </p>
                  )}
                </div>
              </div>

              <div className="text-left formControl">
                <label className="text-sm font-medium mb-2 formLable block">
                  Confirm Password
                </label>

                <div className="relative rounded-md ">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                      <img src={passwordicon}></img>
                    </span>
                  </div>
                  <input
                    type={showPasswordconfirm ? "text" : "password"}
                    id="price"
                    required
                    className={`pl-8 rounded-md .. py-1.5 pl-7 pr-2 searchInput  w-full ${
                      valdationConfirm ||
                      valdationpasslength ||
                      valdationPassword ||
                      valdationpass
                        ? "redFocusBorder"
                        : ""
                    }`}
                    placeholder="Enter"
                    value={ConfirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setValidationNew(false);
                      setValidationPasslength(false);
                      setValidationPassword(false);
                      setValidationPass(false);
                      setValidationOldPass(false);
                      setValidation(false);
                    }}
                  />
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={togglePasswordVisibilityConfirm}
                  >
                    <span className="text-gray-500 sm:text-sm">
                      {showPasswordconfirm ? (
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      ) : (
                        <i className="fa fa-eye-slash" aria-hidden="true"></i>
                      )}
                    </span>
                  </div>
                </div>
                {valdationConfirm && (
                  <p className="mt-1 invalidlogin text-pink-600 text-xs">
                    Confirm Password cannot be blank.
                  </p>
                )}

                {valdationpasslength && (
                  <p className="mt-1 invalidlogin text-pink-600 text-xs">
                    The password field must be at least 6 characters.
                  </p>
                )}
                {valdationPassword && (
                  <p className="mt-1 invalidlogin text-pink-600 text-xs">
                    Password & confirm Password does not match.
                  </p>
                )}

                {valdationpass && (
                  <p className="mt-1 invalidlogin text-pink-600 text-xs">
                    New password can not be the old password!
                  </p>
                )}
              </div>
            </div>

            <div className="px-2 py-2 rounded-md ... formLoginButton">
              <div
                className="text-sm font-medium formLoginBtnname cursor-pointer uppercase"
                onClick={handlechangePass}
              >
                Change Password
              </div>
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
                  <Dialog.Panel>
                    <div className="m-32">
                      <Loader />
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

export default ChangePassword;
