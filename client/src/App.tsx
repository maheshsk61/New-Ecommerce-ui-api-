import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import ProductList from "./components/product-list/product-list";
import Laptop from "./components/products/laptop/laptop";
import Headphone from "./components/products/headphone/headphone";
import Product from "./components/products/product";
import Cart from "./components/cart/cart";
import Register from "./components/register-user/register";

export const routers = createBrowserRouter([
  {
    path:"/register",
    element: (
      <>
        <Register/>
      </>
    )
  },
  {
    path: "/home",
    element: (
      <>
        <Navbar />
        <ProductList />
      </>
    ),
  },
  {
    path: "/Laptops",
    element: (
      <>
        <Navbar />
        <Laptop />
      </>
    ),
  },
  {
    path: "/Headphones",
    element: (
      <>
        <Navbar />
        <Headphone />
      </>
    ),
  },
  {
    path: "/:productname",
    element: (
      <>
        <Navbar />
        <Product />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Navbar />
        <Cart />
      </>
    ),
  },
]);
