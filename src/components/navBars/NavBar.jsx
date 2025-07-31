import { NavLink } from "react-router-dom";
import { routers } from "@/routers/router.js";
function MainNavBar() {
  const list = routers[0]?.children || [];
  return (
    <>
      <ul className="mainNavBar">
        {list.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.handler?.title ? item.handler.title : "not handler"}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MainNavBar;
