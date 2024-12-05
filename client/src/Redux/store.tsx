import { configureStore } from "@reduxjs/toolkit";
import ProductListReducer from "./slices/product-lists";
import searchQueryReducer from "./slices/search-query"
const store = configureStore({
  reducer: {
    productLists: ProductListReducer,
    search: searchQueryReducer
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
