import { Outlet } from "react-router-dom";
import "./App.css";
import PaymentsManager from "./components/Payments/PaymentsMeneger";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <h2> App</h2>
      <PaymentsManager />
    </>
  );
}

export default App;
