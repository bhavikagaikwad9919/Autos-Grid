import logo from "../assets/logoAutosGrid.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const LoginVerifyOtp = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const [valdation, setValidation] = useState(false);
  const [valdationotp, setValidationotp] = useState(false);
  const [ipAddress, setIpAddress] = useState();

  let navigate = useNavigate();

  let location = useLocation();

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleForgetPassword();
    }
  };

  const handlekey = (e: any, ele: any) => {
    console.log(e.key);
    if (e.key === "ArrowLeft") {
      ele.previousSibling.focus();
    } else if (e.key === "ArrowRight") {
      ele.nextSibling.focus();
    }
  };

  const verifyOtp = async () => {
    const otpval = otp.join("");
    if (otpval.length >= 0 && otpval.length <= 6) {
      let item = {
        otp: otpval,
        platform: navigator.platform,
        ip_address: ipAddress,
      };
      try {
        const apiUrl = `${
          import.meta.env.VITE_APP_BASE_URL
        }/api/auth/verify_otp`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        });
        const responseData = await response.json();
        const token = responseData.data.token;
        localStorage.setItem("tokenLogin", token);

        if (responseData.status_code === 200) {
          toast.success(responseData.message, {});

          setTimeout(() => {
            navigate("/AdminDashboard", { replace: true });
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

  const handleApiCall = async () => {
    try {
      const formData = {
        email: location.state.email,
        password: location.state.password,
        platform: navigator.platform,
        ip_address: ipAddress,
      };

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
        toast.success(responseData.message, {});
        setTimeout(() => {
          navigate("/AdminDashboard");
        }, 3000);
      } else if (responseData.data.verified === false) {
        toast.success(responseData.message, {});
        navigate("/LoginVerifyOtp", {
          state: { email: formData.email, password: formData.password },
        });
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };
  const handleForgetPassword = () => {
    verifyOtp();
    setValidationotp(false);
  };

  const handleBack = () => {
    navigate("/", { replace: true });
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
              <div className="text-left mt-9">
                <div className="text-left mt-4">
                  <div className="text-left formControl">
                    <div className="text-left mt-9">
                      <div className="forgetpassword text-2xl font-medium text-center">
                        Login with OTP
                      </div>

                      <div className="text-left mt-5">
                        <div className="text-left formControl">
                          <div className="relative mb-2">
                            <label className="text-sm font-medium mb-2 formLable">
                              Enter Mobile Number
                            </label>

                            <label
                              className="text-sm font-medium ml-40 forgetpassword cursor-pointer resetpasstext"
                              onClick={handleApiCall}
                            >
                              Resend
                            </label>
                          </div>

                          <div className="relative rounded-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 items-center ml-3 my-2 mr-2">
                              <span className="text-gray-500 sm:text-sm">
                                <i
                                  className="fa fa-mobile mr-2"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </div>
                            <input
                              name="password"
                              id="id_password"
                              required
                              className="rounded-md py-1.5 pl-9 pr-2 text-sm searchInput w-full peer h-10"
                              placeholder="Enter"
                              value="+91 9766007468"
                              readOnly
                              onKeyPress={handleKeyPress}
                            />
                            <div className="flex">
                              <label className="text-sm font-medium mb-4 mt-5 formLable">
                                Enter verification code456
                              </label>
                            </div>

                            <div className="relative rounded-md">
                              <div className="flex">
                                {otp.map((data, idx) => (
                                  <input
                                    ref={idx === 0 ? ref1 : ref2}
                                    type="text"
                                    onKeyPress={handleKeyPress}
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
                                    onKeyDown={(e) =>
                                      handlekey(e, e.currentTarget)
                                    }
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
                    <ToastContainer />
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

export default LoginVerifyOtp;
