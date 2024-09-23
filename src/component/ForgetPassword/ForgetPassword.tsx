import logo from "../../assets/logoAutosGrid.png";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import Loader from "../Loader";
import { Fragment } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [valdation, setValidation] = useState(false);
  const [valdationEmail, setValidationEmail] = useState(false);
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();

  const handleForgetPassword = () => {
    setOpen(true);
    forgetPasswordEmail();
    setValidation(false);
    setValidationEmail(false);
  };

  const handleBack = () => {
    navigate("/", { replace: true });
  };

  const formData = { email: email };

  const forgetPasswordEmail = async () => {
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
      }/api/auth/password/email`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData.status_code === 200) {
        toast.success(responseData.message, {});
        setTimeout(() => {
          navigate("/ForgetPassword/ForgetPasswordmsg", {
            state: { email },
            replace: true,
          });
        }, 2000);
      } else if (email === "") {
        setOpen(false);
        setValidation(true);
      } else if (responseData.status_code === 201) {
        setOpen(false);
        setValidationEmail(true);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

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
              <div className="grid text-left mt-5">
                <div className="forgetpassword text-2xl font-medium text-center">
                  Reset your Password{" "}
                </div>
                <div className="grid text-left mt-5">
                  <div className="text-left formControl">
                    <label className="text-sm font-medium mb-2 formLable block">
                      Enter Registered Email
                    </label>
                    <div className="relative rounded-md">
                      <div className="pointer-events-none absolute inset-y-0 left-0 items-center ml-3 my-2 mr-2">
                        <span className="text-gray-500 sm:text-sm">
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                      </div>
                      <input
                        name="password"
                        id="id_password"
                        required
                        className={`rounded-md py-1.5 pl-9 pr-2 text-sm searchInput w-full peer h-10 ${
                          valdation || valdationEmail ? "redFocusBorder" : ""
                        }`}
                        placeholder="Enter"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setValidation(false);
                          setValidationEmail(false);
                        }}
                      />
                      {!valdation && !valdationEmail ? (
                        <div className="forgetpasstext mt-2 text-sm font-medium">
                          *You will receive a verification code via email
                        </div>
                      ) : (
                        ""
                      )}
                      {valdation && (
                        <p className="text-pink-600 text-xs mt-1">
                          Email address is required to proceed.
                        </p>
                      )}
                      {valdationEmail && (
                        <p className="text-pink-600 text-xs mt-1">
                          Please enter a valid email.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                className="w-full py-2 rounded-md text-sm font-medium formLoginButton cursor-pointer uppercase"
                onClick={handleForgetPassword}
              >
                Send
              </button>
              <ToastContainer />
            </div>
            <div
              className="forgetpassword text-sm font-medium mt-2.5 cursor-pointer"
              onClick={handleBack}
            >
              Back to Login
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

export default ForgetPassword;
