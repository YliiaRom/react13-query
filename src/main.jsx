import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./store/index.js";
import { Provider } from "react-redux";
import router from "./routers/router";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* <App /> */}
    </Provider>
  </>
);
