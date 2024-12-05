import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import ProductList from "./components/product-list/product-list";

export const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <ProductList />
      </>
    ),
  },
]);
