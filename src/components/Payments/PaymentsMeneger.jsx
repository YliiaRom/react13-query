import { categoriesList } from "@/data/settings.js";
import PaymentsForm from "./PaymentsForm";
import PaymentsList from "./PaymentsList";

function PaymentsManager() {
  return (
    <div className="sectionWrap">
      <h2>Manager Money</h2>
      <PaymentsList />
      <PaymentsForm categoriesList={categoriesList} />
    </div>
  );
}

export default PaymentsManager;
