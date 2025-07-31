import NavBarPosts from "@/components/navBars/NavBarPosts";
import { Outlet } from "react-router-dom";

function MainPosts() {
  return (
    <>
      <NavBarPosts />
      <Outlet />
    </>
  );
}

export default MainPosts;
