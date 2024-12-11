import { Box, Card, Grid2, Skeleton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { IHandleButtons, ILoading, IProductsData } from "../../interface";
import Buttons from "../reuse-components/button/button";
import { constant } from "../../constant";
import {
  setIsDisabled,
  setRemoveFromCart,
} from "../../Redux/slices/handle-buttons";
import { useEffect } from "react";
import { setLoading } from "../../Redux/slices/loading";

const Cart: React.FC = (): JSX.Element => {
  const cart: IHandleButtons = useSelector((state: RootState) => state.buttons);
  //console.log(cart);
  const loading: ILoading = useSelector((state: RootState) => state.loading);
  const buttons: IHandleButtons = useSelector(
    (state: RootState) => state.buttons
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleRemoveFromCart = (product: IProductsData | any) => {
    dispatch(setIsDisabled(true));
    setTimeout(() => {
      dispatch(setIsDisabled(false));
      dispatch(setRemoveFromCart(product.id));
    }, 500);
  };
  let price: number = 0;
  cart.cartItems.map((product) => {
    price = price + product.price;
    return price;
  });
  //console.log(price);

  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 1000);
  }, []);

  return (
    <Box sx={{ padding: 5, marginTop: 5 }}>
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
        <Box className="d-flex justify-content-center w-100">
          <Typography variant="h5">
            <i>{constant.cartEmpty}</i>
          </Typography>
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
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: 400, height: 300 }}
                  />
                  <Buttons
                    value={constant.removeFromCart}
                    onClick={() => handleRemoveFromCart(product)}
                    backgroundColor={"var(--red-color)"}
                    sx={{
                      marginTop: 1,
                      borderRadius: 2,
                    }}
                    isDisabled={buttons.isDisabled}
                  />
                </Box>
                <Box className="ms-5">
                  <Typography
                    variant="h4"
                    sx={{
                      marginTop: {
                        xs: 1,
                        sm: 1,
                        md: 0,
                      },
                    }}
                  >
                    {product.name}
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
      <Box sx={{ marginTop: 7 }}>
        {cart.cartItems.length > 0 && (
          <Card
            className="p-3"
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              background: "var(--black-color)",
              borderRadius: 0,
            }}
          >
            <Box
              className="d-flex"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography
                variant="h6"
                sx={{ padding: 1, color: "var(--white-color)" }}
              >
                {constant.totalPrice}:
              </Typography>
              <Box
                className="d-flex"
                sx={{
                  backgroundColor: "#006400",
                  padding: 1,
                  color: "var(--white-color)",
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6">{constant.rupees}</Typography>
                <Typography variant="h6">{price}</Typography>
              </Box>
            </Box>
          </Card>
        )}
      </Box>
    </Box>
  );
};
export default Cart;
