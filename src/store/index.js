import { configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./paymentsSlice.js";
import postsSliceReducer from "./postsSlice.js";
import { addHistoryMDL } from "@/middlewares/addHistoryMiddleware.js";
import { pokemonApi } from "@/services/pokemonApi.js";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./postsRTKQuery.js";
import { postsApi } from "@/api/postsApi.js";

const store = configureStore({
  reducer: {
    payments: paymentReducer,
    posts: postsSliceReducer,
    [api.reducerPath]: api.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    // Додаємо згенерований редьюсер query
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // Додавання мідлвару API увімкне кешування, інвалідацію, опитування та інші корисні функції `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(addHistoryMDL)
      .concat(api.middleware)
      .concat(pokemonApi.middleware)
      .concat(postsApi.middleware),
});
// Необов'язково, але необхідно для поведінки refetchOnFocus/refetchOnReconnect.
// Див. документацію `setupListeners` - приймає необов'язковий зворотний виклик як другий аргумент для кастомізації.
setupListeners(store.dispatch);
export default store;
