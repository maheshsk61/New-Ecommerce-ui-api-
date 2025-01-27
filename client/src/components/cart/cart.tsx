import {
  Box,
  Card,
  Grid2,
  Skeleton,
  Typography,
  ImageList,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { IHandleButtons, ILoading, IProductsData } from "../../interface";
import Buttons from "../reuse-components/button/button";
import { constant } from "../../constant";
import {
  setCartItemsFromLocalStorage,
  setRemoveFromCart,
  setShiftProductsFromCartToBuyNow,
} from "../../Redux/slices/handle-buttons";
import React, { useEffect, useState } from "react";
import { setLoading } from "../../Redux/slices/loading";
import { useNavigate } from "react-router-dom";
import PriceTable from "../reuse-components/price-table/price-table";

const Cart: React.FC = (): JSX.Element => {
  const [disabledButtonRemoveFromCart, setDisabledButtonRemoveFromCart] =
    useState<{ [key: string]: boolean }>({});
  const cart: IHandleButtons = useSelector((state: RootState) => state.buttons);
  //console.log(cart);
  const loading: ILoading = useSelector((state: RootState) => state.loading);
  const dispatch = useDispatch<AppDispatch>();
  const handleRemoveFromCart = (
    product: IProductsData | any,
    index: number
  ) => {
    setDisabledButtonRemoveFromCart({ [index]: true });
    setTimeout(() => {
      setDisabledButtonRemoveFromCart({ [index]: false });
      dispatch(setRemoveFromCart(product.id));
    }, 500);
  };
  const shiftProductsFromCartToBuyNow = () => {
    dispatch(setShiftProductsFromCartToBuyNow());
    navigate("/buyNow");
  };
  let price: number = 0;
  cart.cartItems.map((product) => {
    price = price + product.price;
    return price;
  });
  //console.log(price);
  const taxRate: number = 0.18;
  const taxPrice: number = Math.trunc(price * taxRate);
  //console.log(taxPrice);
  const totalPriceWithTax: number = Math.trunc(price + taxPrice);
  //console.log(totalPriceWithTax);
  const navigate = useNavigate();
  const handleShopNow = () => {
    navigate("/home");
  };

  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, []);

  useEffect(() => {
    const storedInCart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (storedInCart.length > 0) {
      dispatch(setCartItemsFromLocalStorage(storedInCart));
    }
  }, [dispatch]);

  return (
    <Box sx={{ padding: 5, marginTop: { xs: 0 } }}>
      {loading.loading ? (
        Array.from({ length: cart.cartItems.length ?? 0 }, (_, index) => {
          return (
            <Grid2
              sx={{
                gridColumn: {
                  xs: "span 12", // Full width on extra-small screens
                  sm: "span 6", // Half width on small screens
                  md: "span 4", // One-third width on medium screens
                  lg: "span 4", // Same as md
                  xl: "span 3", // One-fourth width on extra-large screens
                },
              }}
              key={index}
            >
              <Skeleton variant="rectangular" width={1200} height={400} />
            </Grid2>
          );
        })
      ) : cart && cart.cartItems.length === 0 ? (
        <Box className="d-flex flex-column align-items-center w-100">
          <Typography variant="h3">
            {constant.cartEmpty}
            <img
              src="https://icons.iconarchive.com/icons/icons8/windows-8/512/Ecommerce-Return-Purchase-icon.png"
              alt="cart-icon"
              style={{ width: "50px", height: "auto", marginLeft: "10px" }}
            />
          </Typography>
          <Typography variant="h6">{constant.addItems}</Typography>
          <Buttons value={constant.shopNow} onClick={handleShopNow} />
        </Box>
      ) : (
        cart.cartItems.length > 0 &&
        cart.cartItems.map((product, index) => {
          //console.log(product)
          return (
            <Grid2
              sx={{
                marginBottom: index === cart.cartItems.length - 1 ? 0 : 1,
                gridColumn: {
                  xs: "span 12",
                  sm: "span 6",
                  md: "span 4",
                  lg: "span 4",
                  xl: "span 3",
                },
              }}
              key={`${index}`}
              className="d-flex"
            >
              <Card
                className="p-3"
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "column", md: "row" },
                }}
              >
                <Box className="d-flex flex-column">
                  <ImageList
                    sx={{
                      width: {
                        xs: "auto",
                        sm: "auto",
                        md: 400,
                        lg: 400,
                        xl: 400,
                        xxl: 400,
                      },
                      height: "auto",
                    }}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      style={{
                        objectFit: "cover",
                        width: "200%",
                        height: "100%",
                      }}
                    />
                  </ImageList>
                  <Buttons
                    value={constant.removeFromCart}
                    onClick={() => handleRemoveFromCart(product, index)}
                    backgroundColor={"var(--red-color)"}
                    sx={{
                      marginTop: 1,
                      borderRadius: 2,
                    }}
                    isDisabled={disabledButtonRemoveFromCart[index]}
                  />
                </Box>
                <Box className="ms-5">
                  <Typography
                    component="p"
                    sx={{
                      marginTop: {
                        xs: 1,
                        sm: 1,
                        md: 0,
                      },
                      fontSize: {
                        xs : "1rem",
                        sm: "1rem",
                        md: "2rem"
                      }
                    }}
                  >
                    <b>{product.name}</b>
                  </Typography>
                  <Typography variant="h4">
                    {constant.rupees}
                    {product.price}
                  </Typography>
                  {product.details &&
                    Object.entries(product.details).map(
                      ([key, value], index) => {
                        return (
                          <Box key={index}>
                            <Typography variant="h6">
                              <b>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </b>
                              : {value as string}
                            </Typography>
                          </Box>
                        );
                      }
                    )}
                </Box>
              </Card>
            </Grid2>
          );
        })
      )}
      <Box sx={{ textAlign: "left", marginTop: 2 }}>
        {cart.cartItems.length > 0 && (
          <PriceTable
            subTotal={price}
            taxPrice={taxPrice}
            grandTotal={totalPriceWithTax}
          />
        )}
      </Box>
      {cart.cartItems.length > 0 && (
        <Box textAlign="center">
          <Buttons
            value={constant.clickToProceed}
            onClick={shiftProductsFromCartToBuyNow}
            backgroundColor="var(--green-color)"
            sx={{ marginTop: 2 }}
          />
        </Box>
      )}
    </Box>
  );
};
export default Cart;
