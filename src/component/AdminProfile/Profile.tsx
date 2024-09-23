import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { ToastContainer } from "react-toastify";

interface ProfileData {
  name: string;
  email: string;
}
const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  let navigate = useNavigate();

  const HandlePasswordChange = () => {
    navigate("/ChangePassword");
  };

  const token = localStorage.getItem("tokenLogin");

  const handlecustompages = async () => {
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
      }/api/get_profile_admin`;
      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await dataResponse.json();
      if (data.status_code === 200) {
        setProfile(data.data);
      } else {
        alert("wrong");
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  useEffect(() => {
    handlecustompages();
  }, []);

  return (
    <div>
      {profile ? (
        <div className="mx-12">
          <div className="grid text-left mt-9">
            <div className="text-sm font-medium mb-2 formLable flex">
              {" "}
              <span>
                <i className="mr-2 fa fa-user"></i>
              </span>
              First Name : {profile.name}
            </div>
          </div>
          <div className="grid text-left mt-7">
            <label className="text-sm font-medium mb-2 formLable flex">
              <span>
                <i className="mr-2 mt-0.5 fa fa-envelope"></i>
              </span>
              Email : {profile.email}{" "}
            </label>
          </div>
          <div className="grid text-left mt-7">
            <div className="text-sm font-medium mb-2 formLable flex">
              {" "}
              <span>
                <i className="fa fa-mobile mr-2" aria-hidden="true"></i>
              </span>
              Mobile Number : +91 9766007468
            </div>
          </div>
          <div className="mt-7 px-2 py-2 w-64 rounded-md ... formLoginButton">
            <div
              className="text-sm font-medium formLoginBtnname cursor-pointer uppercase"
              onClick={HandlePasswordChange}
            >
              Change Password
            </div>
          </div>

          <div></div>
        </div>
      ) : (
        <Loader />
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;
