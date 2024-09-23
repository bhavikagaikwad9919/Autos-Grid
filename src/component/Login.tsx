import usernameicon from "../assets/icon.png";
import passwordicon from "../assets/Vector.png";
import logo from "../assets/logoAutosGrid.png";
import { useNavigate } from "react-router-dom";
import "react-lite-toast/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Loader from "./Loader";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [valdation, setValidation] = useState(false);
  const [valdationPass, setValidationPass] = useState(false);
  const [open, setOpen] = useState(false);
  const [valdationusername, setValidationUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ipAddress, setIpAddress] = useState();

  const formData = {
    email: userName,
    password: password,
    platform: navigator.platform,
    ip_address: ipAddress,
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApiCall();
    }
  };

  const handleApiCall = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/auth/login`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (responseData.data.verified === true) {
        const token = responseData.data.token;
        localStorage.setItem("tokenLogin", token);
        setOpen(true);
        toast.success(responseData.message, {});
        setTimeout(() => {
          navigate("/AdminDashboard");
        }, 3000);
      } else if (responseData.data.verified === false) {
        navigate("/LoginVerifyOtp", {
          state: { email: userName, password: password },
        });
      } else {
        if (userName === "") {
          setValidation(true);
          setValidationUsername(false);
        } else if (password === "") {
          setValidationPass(true);
        } else {
          setValidationUsername(true);
        }
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  let navigate = useNavigate();

  const handleLogin = () => {
    handleApiCall();
    setValidationUsername(false);
    setValidation(false);
    setValidationPass(false);
  };

  const handleForgetPassword = () => {
    navigate("/ForgetPassword");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const ipAddress = data.ip;
        setIpAddress(ipAddress);
      })
      .catch((error) => console.error("Error fetching IP address:", error));
  }, []);
  const cancelButtonRef = useRef(null);

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
              <div className="grid text-left mt-10">
                <div className="text-left formControl">
                  <label className="text-sm font-medium mb-2 formLable block">
                    Username
                  </label>
                  <div className="relative rounded-md ">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ml-3 my-3.5 mr-2">
                      <span className="text-gray-500 sm:text-sm w-3 h-3.5">
                        <img src={usernameicon}></img>
                      </span>
                    </div>
                    <input
                      type="text"
                      id="price"
                      onKeyPress={handleKeyPress}
                      required
                      className={`rounded-md py-1.5 pl-9 pr-2 text-sm searchInput w-full peer h-10 ${
                        valdation || valdationusername ? "redFocusBorder" : ""
                      }`}
                      placeholder="Admin"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        setValidation(false);
                        setValidationUsername(false);
                      }}
                    />
                    {valdation && (
                      <p className="absolute text-pink-600 text-xs mt-1">
                        Username cannot be blank.
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-left formControl">
                  <label className="text-sm font-medium mb-2 formLable block">
                    Password
                  </label>
                  <div className="relative rounded-md">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center ml-3 my-3.5 mr-2">
                      <span className="text-gray-500 sm:text-sm w-3 h-3.5">
                        <img src={passwordicon} alt="password icon" />
                      </span>
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="id_password"
                      onKeyPress={handleKeyPress}
                      required
                      className={`rounded-md py-1.5 pl-9 pr-2 text-sm searchInput w-full peer h-10 ${
                        valdationPass || valdationusername
                          ? "redFocusBorder"
                          : ""
                      }`}
                      placeholder="Enter"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setValidationPass(false);
                        setValidationUsername(false);
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
                    {valdationPass && (
                      <p className="absolute text-pink-600 text-xs mt-1">
                        Please enter your password to proceed.
                      </p>
                    )}
                    {valdationusername && (
                      <p className="absolute text-pink-600 text-xs mt-1">
                        UserName & Password does not match with our record.
                      </p>
                    )}
                  </div>
                </div>
                <div
                  className="forgetpassword text-sm font-medium cursor-pointer text-left"
                  onClick={handleForgetPassword}
                >
                  Forgot password
                </div>
              </div>

              <div className="text-center">
                <button
                  className="mt-7 w-full py-2 rounded-md text-sm font-medium formLoginButton cursor-pointer uppercase"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <ToastContainer />
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

export default Login;
