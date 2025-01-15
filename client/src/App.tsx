import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import ProductList from "./components/product-list/product-list";
import Laptop from "./components/products/laptop/laptop";
import Headphone from "./components/products/headphone/headphone";
import Product from "./components/products/product";
import Cart from "./components/cart/cart";
import Register from "./components/register-user/register";
import Login from "./components/login-user/login";
import BuyNow from "./components/buy-now/buy-now";
import Home from "./components/home/home";

export const routers = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path: "/register",
    element: (
      <>
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/buyNow",
    element: (
      <>
        <BuyNow />
      </>
    ),
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
