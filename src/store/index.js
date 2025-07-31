import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./paymentsSlice.js";
import postsSliceReducer from "./postsSlice.js";

const store = configureStore({
  reducer: {
    payments: paymentReducer,
    posts: postsSliceReducer,
  },
});
export default store;
