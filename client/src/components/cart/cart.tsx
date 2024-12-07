import { Box, Card, Grid2, Skeleton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { IHandleButtons, ILoading, IProductsData } from "../../interface";
import Buttons from "../reuse-components/button/button";
import { constant } from "../../constant";
import { setRemoveFromCart } from "../../Redux/slices/handle-buttons";
import { useEffect } from "react";
import { setLoading } from "../../Redux/slices/loading";

const Cart: React.FC = (): JSX.Element => {
  const cart: IHandleButtons = useSelector((state: RootState) => state.buttons);
  //console.log(cart);
  const loading: ILoading = useSelector((state: RootState) => state.loading);
  const dispatch = useDispatch<AppDispatch>();
  const handleRemoveFromCart = (product: IProductsData | any) => {
    dispatch(setRemoveFromCart(product.id));
  };
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
              <Skeleton variant="rectangular" width={1600} height={400} />
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
                marginBottom: 10,
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
              <Card className="d-flex p-3">
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
                  />
                </Box>
                <Box className="d-flex flex-column ms-5">
                  <Typography variant="h4" sx={{ marginBottom: 2 }}>
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
    </Box>
  );
};
export default Cart;
