import { configureStore } from "@reduxjs/toolkit";
import ProductListReducer from "./slices/product-lists";
import searchQueryReducer from "./slices/search-query";
import productsReducer from "./slices/products";
import buttonsReducer from "./slices/handle-buttons";
import loadingReducer from "./slices/loading";
const store = configureStore({
  reducer: {
    productLists: ProductListReducer,
    search: searchQueryReducer,
    products: productsReducer,
    buttons: buttonsReducer,
    loading: loadingReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
