import passwordicon from "../../assets/Vector.png";
import logo from "../../assets/logoAutosGrid.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Loader from "../Loader";

const ForgtPasswordSet = () => {
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [valdation, setValidation] = useState(false);
  const [valdationToken, setvaldationToken] = useState(false);
  const [valdationPass, setvaldationPass] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordconfirm, setShowPasswordConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [otpVal, setOtpVal] = useState();

  let navigate = useNavigate();
  let location = useLocation();

  const handlePasswordSet = () => {
    reSetPassword();
    setValidation(false);
    setvaldationToken(false);
    setvaldationPass(false);
  };

  const formData = {
    token: otpVal,
    password_confirmation: ConfirmPassword,
    password: password,
  };

  const reSetPassword = async () => {
    try {
      const fetch = window.fetch;
      window.fetch = async (...args) => {
        const result = await fetch(...args);
        if (result.status === 500) {
          navigate("/");
        }
        return result;
      };
      const apiUrl = `${
        import.meta.env.VITE_APP_BASE_URL
      }/api/auth/password/reset`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();

      if (responseData.status_code === 200) {
        setOpen(true);
        toast.success(responseData.message, {});
        setTimeout(() => {
          navigate("/ForgtPasswordSet/ForgetPasswordSuccess", {
            replace: true,
          });
        }, 2000);
      } else if (password === "" || ConfirmPassword === "") {
        setValidation(true);
      } else if (responseData.status_code === 201) {
        setvaldationToken(true);
      } else if (responseData.status_code === 203) {
        setvaldationPass(true);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibilityConfirm = () => {
    setShowPasswordConfirm(!showPasswordconfirm);
  };
  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    } else if (location?.state?.otpval === null || undefined) {
      navigate("/");
    } else {
      setOtpVal(location?.state?.otpval);
    }
  }, []);
  return (
    <div className="loginWrap">
      <div className="grid grid-flow-row grid-cols-2 gap-0">
        <div className=""></div>
        <div className="">
          <div className="loginform text-center">
            <div className="">
              <div className="text-center logoWrap">
                <img src={logo} />
              </div>

              <div className="forgetpassword mt-10 text-2xl font-medium text-center">
                Reset your Password{" "}
              </div>

              <div className="grid text-left mt-7">
                <div className="text-left formControl">
                  <label className="text-sm font-medium mb-2 formLable block">
                    New Password
                  </label>

                  <div className="relative rounded-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">
                        <img src={passwordicon}></img>
                      </span>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="price"
                      className={`pl-8 rounded-md .. py-1.5 pl-7 pr-2 searchInput  w-full ${
                        valdation || valdationToken || valdationPass
                          ? "redFocusBorder"
                          : ""
                      }`}
                      placeholder="Enter"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setValidation(false);
                        setvaldationPass(false);
                        setvaldationToken(false);
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
                  </div>
                </div>

                <div className="text-left formControl">
                  <label className="text-sm font-medium mb-2 formLable block">
                    Confirm Password
                  </label>

                  <div className="relative rounded-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">
                        <img src={passwordicon}></img>
                      </span>
                    </div>
                    <input
                      type={showPasswordconfirm ? "text" : "password"}
                      name="price"
                      id="price"
                      className={`pl-8 rounded-md .. py-1.5 pl-7 pr-2 searchInput  w-full ${
                        valdation || valdationToken || valdationPass
                          ? "redFocusBorder"
                          : ""
                      }`}
                      placeholder="Enter"
                      value={ConfirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setValidation(false);
                        setvaldationPass(false);
                        setvaldationToken(false);
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

                  {valdation && (
                    <p className="text-pink-600 text-xs mt-1">
                      The password field is required.
                    </p>
                  )}
                  {valdationToken && (
                    <p className="text-pink-600 text-xs mt-1">
                      Passwords don't match. Please re-enter.
                    </p>
                  )}
                  {valdationPass && (
                    <p className="text-pink-600 text-xs mt-1">
                      New password cannot be the old password!
                    </p>
                  )}
                </div>
              </div>
              <div className="text-center">
                <button
                  className="w-full py-2 rounded-md text-sm font-medium formLoginButton cursor-pointer uppercase"
                  onClick={handlePasswordSet}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
      {open && (
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
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

export default ForgtPasswordSet;
