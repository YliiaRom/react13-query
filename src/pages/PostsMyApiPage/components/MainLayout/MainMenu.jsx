import { routers } from "@/routers/router.js";
import React from "react";
import { NavLink } from "react-router-dom";

const MainMenu = () => {
  const routersNav = routers[0]?.children[0]?.children || [];
  return (
    <nav>
      <ul className="headerList">
        {routersNav
          // .filter((route) => !route.meta.notInMenu)
          .map((item, index) => (
            <li key={index}>
              <NavLink
                to={`/posts-my-api/${item.path}`}
                className={({ isActive }) => (isActive ? "accent" : "#fff")}
                // end={path === "/"}
              >
                {item.handler.title}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default MainMenu;
