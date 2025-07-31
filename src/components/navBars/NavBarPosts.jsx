import { routers } from "@/routers/router.js";
import { NavLink } from "react-router-dom";

function NavBarPosts() {
  const routeInRoutes = routers[0]?.children[1]?.children;
  return (
    <>
      <ul className="mainNavBar">
        {routeInRoutes.map((el, index) => (
          <li key={index}>
            <NavLink to={el.path ? `/posts/${el.path}` : `/posts`}>
              {el.handler.title ? el.handler.title : "home"}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

export default NavBarPosts;
