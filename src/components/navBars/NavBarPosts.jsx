import { routers } from "@/routers/router.js";
import { NavLink } from "react-router-dom";

function NavBarPosts() {
  const routeInRoutes = routers[0]?.children[1]?.children;
  return (
    <div
      style={{
        padding: "10px",
        border: "10px double #999",
        borderRadius: "10px",
        marginBlockEnd: "20px",
      }}
    >
      <ul className="mainNavBar">
        {routeInRoutes.map((el, index) => (
          <li key={index}>
            <NavLink to={el.path ? `/posts/${el.path}` : `/posts`}>
              {el.handler.title ? el.handler.title : "home"}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavBarPosts;
