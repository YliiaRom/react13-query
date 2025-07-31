import { deletePayment, repeatItem } from "@/store/paymentsSlice.js";
import { useDispatch } from "react-redux";

function PaymentItem({ paymentItemData }) {
  const dispatch = useDispatch();
  const handlerDel = (id) => {
    dispatch(deletePayment(id));
  };
  deletePayment;
  return (
    <div className="paymentItemDataCss">
      <div>{paymentItemData.category}</div>
      <div>{paymentItemData.money}$</div>
      <div>
        <button onClick={() => handlerDel(paymentItemData.id)}>delete</button>
        <button onClick={() => dispatch(repeatItem(paymentItemData.id))}>
          repeat
        </button>
      </div>
    </div>
  );
}

export default PaymentItem;
