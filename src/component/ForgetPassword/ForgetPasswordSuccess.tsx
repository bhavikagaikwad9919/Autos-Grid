import logo from "../../assets/logoAutosGrid.png";
import { useNavigate } from "react-router-dom";

const ForgetPasswordSuccess = () => {
  let navigate = useNavigate();

  const handleBackLogin = () => {
    navigate("/", { replace: true });
  };

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
                Congrats!
              </div>

              <div className="text-sm font-medium forpasswordalert mt-6">
                Your password has been reset successfully
              </div>
              <div className="text-center">
                <button
                  className="mt-7 w-full py-2 rounded-md text-sm font-medium formLoginButton cursor-pointer uppercase"
                  onClick={handleBackLogin}
                >
                  Go to login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordSuccess;
