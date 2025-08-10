import React from "react";

import MainMenu from "./MainMenu";
import { Outlet } from "react-router-dom";

const MainLayoutPosts = () => {
  return (
    <div>
      <header className="headerQ">
        <MainMenu />
      </header>
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
      <footer
        style={{
          background: "#282c34",
          padding: "10px",
          color: "white",
          textAlign: "center",
        }}
      >
        © React RTK Query App
      </footer>
    </div>
  );
};

export default MainLayoutPosts;
