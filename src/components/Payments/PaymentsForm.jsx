import { useState } from "react";
import { addPayment } from "../../store/paymentsSlice.js";
import { useDispatch } from "react-redux";

function PaymentsForm({ categoriesList }) {
  const [money, setMoney] = useState(0);
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const handlerClick = () => {
    const newPaymentObj = {
      money: Number(money),
      category,
    };
    dispatch(addPayment(newPaymentObj));
    setMoney(0);
    setCategory("");
  };
  return (
    <div className="descriptionWrap">
      <div className="description">
        <div>
          Money:
          <label>
            <input
              type="number"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              placeholder="100"
            />
          </label>
        </div>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value={""}>Оберіть категорію</option>

            {categoriesList.map((categoryItem, index) => (
              <option key={index} value={categoryItem}>
                {categoryItem}
              </option>
            ))}
          </select>
        </label>

        <button className="mainBtn" onClick={handlerClick}>
          add new Payment
        </button>
      </div>
      <p className="title">reducers | filter | find</p>
    </div>
  );
}

export default PaymentsForm;
