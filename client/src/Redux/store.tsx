import { configureStore } from "@reduxjs/toolkit";
import ProductListReducer from "./slices/product-lists";
const store = configureStore({
  reducer: {
    productLists: ProductListReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
