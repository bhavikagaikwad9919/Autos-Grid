import logo from "../../assets/logoAutosGrid.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ForgetPasswordmsg = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [valdation, setValidation] = useState(false);
  const [valdationotp, setValidationotp] = useState(false);
  const [emailVal, setEmailVal] = useState();

  let navigate = useNavigate();

  const location = useLocation();

  const handleChange = (ele: any, idx: any) => {
    if (isNaN(ele.value)) return false;
    const newValue = ele.value.length > 1 ? ele.value.charAt(0) : ele.value;

    if (ele.nextSibling && newValue) {
      ele.nextSibling.focus();
    } else if (ele.previousSibling && !newValue) {
      ele.previousSibling.focus();
    }

    setOtp([...otp.map((d, i) => (i === idx ? newValue : d))]);
  };

  const handlekey = (e: any, ele: any) => {
    if (e.key === "ArrowLeft") {
      ele.previousSibling.focus();
    } else if (e.key === "ArrowRight") {
      ele.nextSibling.focus();
    }
  };

  const handleForgetPassword = () => {
    verifyOtp();
    setValidationotp(false);
  };

  const verifyOtp = async () => {
    const otpval = otp.join("");
    if (otpval.length >= 0 && otpval.length <= 6) {
      let item = {
        token: otpval,
      };
      try {
        const apiUrl = `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/auth/password/token/check`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        const responseData = await response.json();

        if (responseData.status_code === 200) {
          toast.success(responseData.message, {});
          setTimeout(() => {
            navigate("/ForgtPasswordSet", { state: { otpval }, replace: true });
          }, 2000);
        } else if (otpval.length === null) {
        } else if (responseData.status_code === 201) {
          setValidationotp(true);
        }
      } catch (error) {
        console.error("Error making API call:", error);
      }
    }
  };

  const forgetPasswordEmail = async () => {
    const formData = { email: emailVal };
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

      if (responseData.status === false) {
        setValidation(false);
      } else {
        toast.success(responseData.message, {});
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const handleBack = () => {
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    } else if (location?.state?.email === null || undefined) {
      navigate("/");
    } else {
      setEmailVal(location?.state?.email);
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
              <div className="text-left mt-4">
                <div className="forgetpassword text-2xl font-medium text-center">
                  Reset your Password
                </div>

                <div className="text-left mt-5">
                  <div className="text-left formControl">
                    <div className="relative mb-2">
                      <label className="text-sm font-medium mb-2 formLable">
                        Enter Registered Email
                      </label>

                      <label
                        className="text-sm font-medium ml-40 forgetpassword cursor-pointer resetpasstext"
                        onClick={forgetPasswordEmail}
                      >
                        Resend
                      </label>
                    </div>

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
                        className="rounded-md py-1.5 pl-9 pr-2 text-sm searchInput w-full peer h-10"
                        placeholder="Enter"
                        value={emailVal}
                      />
                      <div className="forgetpasswordotpmsg mt-2 text-sm font-medium">
                        A verification code has been sent to your inbox.
                      </div>

                      <div className="flex">
                        <label className="text-sm font-medium mb-2 mt-5 formLable">
                          Enter verification code123
                        </label>
                      </div>

                      <div className="relative rounded-md">
                        <div className="flex">
                          {otp.map((data, idx) => (
                            <input
                              ref={idx === 0 ? ref1 : ref2}
                              type="text"
                              className={`rounded-md pl-2 pr-2 py-2 searchInput searchInputTwo text-center ${
                                valdation || valdationotp
                                  ? "redFocusBorder"
                                  : ""
                              }`}
                              onChange={(e) => {
                                handleChange(e.target, idx);
                                setValidation(false);
                                setValidationotp(false);
                              }}
                              value={data}
                              onKeyDown={(e) => handlekey(e, e.currentTarget)}
                              key={idx}
                            />
                          ))}
                        </div>
                        {valdation && (
                          <p className="text-pink-600 text-xs mt-1">
                            Invalid code. Please try again.
                          </p>
                        )}
                        {valdationotp && (
                          <p className="text-pink-600 text-xs mt-1">
                            Invalid code. Please try again.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button
                      className="w-full py-2 rounded-md text-sm font-medium formLoginButton cursor-pointer uppercase"
                      onClick={handleForgetPassword}
                    >
                      Verify
                    </button>
                  </div>
                </div>
                <ToastContainer />
              </div>
              <div
                className="forgetpassword text-sm font-medium mt-2.5 cursor-pointer text-center"
                onClick={handleBack}
              >
                Back to Login
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordmsg;
