import NavBarMiddlewares from "@/components/navBars/NavBarMiddlewares";
import { Outlet } from "react-router-dom";

function MiddlewarePage() {
  return (
    <>
      <NavBarMiddlewares />

      <Outlet />
    </>
  );
}

export default MiddlewarePage;
