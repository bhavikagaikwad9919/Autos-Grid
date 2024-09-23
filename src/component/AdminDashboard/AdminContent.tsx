import contentUser from "../../assets/entypo_users.png";
import contectUserproduct from "../../assets/Vector count.png";
import watcherIcon from "../../assets/watcherIcon.png";
import "../../App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface DataCounts {
  userCount: number;
  productCount: number;
  deviceCount: number;
  userWatcherCount: number;
  userTankerCount: number;
}

const AdminContent = () => {
  const [dashboardCount, setDashboardCount] = useState<DataCounts>();
  const token = localStorage.getItem("tokenLogin");
  let navigate = useNavigate();

  const handleDashBoardCount = async () => {
    try {
      const fetch = window.fetch;
      window.fetch = async (...args) => {
        const result = await fetch(...args);
        if (result.status === 500) {
          navigate("/");
        }
        return result;
      };
      const apiUrl = `${import.meta.env.VITE_APP_BASE_URL}/api/admin_dashboard`;
      const dataResponse = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await dataResponse.json();
      setDashboardCount(data.data);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  useEffect(() => {
    handleDashBoardCount();
  }, []);
  return (
    <>
      <div>
        <div className="grid grid-flow-row grid-cols-3 gap-10 w-1/2 mt-11 ml-12">
          <div className="bg-white divide-solid borderColor rounded-md ...">
            <div className="text-center cursor-pointer">
              <img src={contentUser} className="display: inline mt-5" />
              <h4 className="mt-3 text-sm font-medium">Total Users</h4>
              <h4 className="text-3xl font-semibold mt-5 mb-2.5">
                {dashboardCount?.userCount}
              </h4>
            </div>
          </div>

          <div className="bg-white divide-solid borderColor rounded-md ...">
            <div className="text-center cursor-pointer">
              <img src={contectUserproduct} className="display: inline mt-5" />
              <h4 className="mt-3 text-sm font-medium">Total Device</h4>
              <h4 className="text-3xl font-semibold mt-5 mb-2.5">
                {dashboardCount?.deviceCount}
              </h4>
            </div>
          </div>

          <div className="bg-white divide-solid borderColor rounded-md ...">
            <div className="text-center cursor-pointer">
              <img src={contectUserproduct} className="display: inline mt-5" />
              <h4 className="mt-3 text-sm font-medium">Total Products</h4>
              <h4 className="text-3xl font-semibold mt-5 mb-2.5">
                {dashboardCount?.productCount}
              </h4>
            </div>
          </div>
        </div>

        <div className="grid grid-flow-row grid-cols-3 gap-10 w-1/2 mt-11 ml-12">
          <div className="bg-white divide-solid borderColor rounded-md ...">
            <div className="text-center cursor-pointer">
              <img src={watcherIcon} className="display: inline mt-5" />
              <h4 className="mt-3 text-sm font-medium">Total Watcher User</h4>
              <h4 className="text-3xl font-semibold mt-5 mb-2.5">
                {dashboardCount?.userWatcherCount}
              </h4>
            </div>
          </div>

          <div className="bg-white divide-solid borderColor rounded-md ...">
            <div className="text-center cursor-pointer">
              <img src={watcherIcon} className="display: inline mt-5" />
              <h4 className="mt-3 text-sm font-medium">Total Tanker User</h4>
              <h4 className="text-3xl font-semibold mt-5 mb-2.5">
                {dashboardCount?.userTankerCount}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminContent;
