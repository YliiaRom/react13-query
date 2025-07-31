import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentsList: [
    {
      id: 1114,
      money: 111,
      category: "auto",
    },
  ],
};

export const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    addPayment: (state, action) => {
      state.paymentsList.push({
        id: new Date().getTime(),
        ...action.payload,
      });
    },
    deletePayment: (state, action) => {
      state.paymentsList = state.paymentsList.filter(
        (el) => el.id !== action.payload
      );
    },
    repeatItem: (state, action) => {
      const payloadItem = state.paymentsList.find(
        (item) => item.id === action.payload
      );
      state.paymentsList.push({
        ...payloadItem,
        id: new Date().getTime(),
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPayment, deletePayment, repeatItem } = paymentSlice.actions;

export default paymentSlice.reducer;
