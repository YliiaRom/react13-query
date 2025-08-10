import { routers } from "@/routers/router.js";
import { NavLink } from "react-router-dom";

function NavBarMiddlewares() {
  const routesMD = routers[0]?.children[3]?.children;
  return (
    <ul className="mainNavBar">
      {routesMD.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.path ? `/middleware/${item.path}` : "/middleware"}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {item.handler.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default NavBarMiddlewares;
