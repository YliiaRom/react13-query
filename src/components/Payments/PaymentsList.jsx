import PaymentItem from "./PaymentItem";
import { useSelector } from "react-redux";

function PaymentsList() {
  const paymentsItems = useSelector((state) => state.payments.paymentsList);

  return (
    <div>
      {paymentsItems.length > 0 ? (
        <div className="paymentsListCss">
          <div className="headerPaymentsListCss">
            <div>Category</div>
            <div>Money</div>
            <div>Action</div>
          </div>
          {paymentsItems.map((paymentItemData) => (
            <div key={paymentItemData.id}>
              <PaymentItem paymentItemData={paymentItemData} />
            </div>
          ))}
        </div>
      ) : (
        <p>Список порожній</p>
      )}
    </div>
  );
}

export default PaymentsList;
