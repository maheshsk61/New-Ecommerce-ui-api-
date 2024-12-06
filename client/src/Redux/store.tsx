import { configureStore } from "@reduxjs/toolkit";
import ProductListReducer from "./slices/product-lists";
import searchQueryReducer from "./slices/search-query"
import productsReducer from "./slices/products"
const store = configureStore({
  reducer: {
    productLists: ProductListReducer,
    search: searchQueryReducer,
    products: productsReducer
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
