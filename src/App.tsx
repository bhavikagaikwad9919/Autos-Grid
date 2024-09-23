import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./main";
import SideNavBar from "./component/navBar/SideNavBar";
import TopNavBar from "./component/navBar/TopNavBar";

function App() {
  return (
    <div className="App">
      <div className="flex-row">
        <div className="grid grid-cols-12 gap-0">
          <div className="col-start-1 col-span-3 col-end-3">
            <SideNavBar />
          </div>
          <div className="col-start-3 col-span-10">
            <TopNavBar />
            <RouterProvider router={routes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
