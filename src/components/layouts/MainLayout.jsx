import { Outlet } from "react-router-dom";
import MainNavBar from "../navBars/NavBar";
import App from "@/App";

function MainLayout() {
  return (
    <>
      <MainNavBar />

      <Outlet />
      {/* <App /> */}
    </>
  );
}

export default MainLayout;
