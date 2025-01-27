import { useNavigate, useParams } from "react-router-dom";
import { ILoading, IProducts, IProductsData } from "../../interface";
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
import Buttons from "../reuse-components/button/button";
import { constant } from "../../constant";
import {
  setAddToCart,
  setBuyNow,
  setCartItems,
} from "../../Redux/slices/handle-buttons";
import { setLoading } from "../../Redux/slices/loading";
import { useEffect, useState } from "react";
import { setClickedProduct } from "../../Redux/slices/products";
import { setImageToOpen, setIsOpen } from "../../Redux/slices/dialog-box";
import Dialogs from "../reuse-components/dialog/dialog";

const Product: React.FC<IProductsData> = (): JSX.Element => {
  const [disabledButtonAddToCart, setDisabledButtonAddToCart] = useState<{
    [key: string]: boolean;
  }>({});
  const [disabledButtonBuyNow, setDisabledButtonBuyNow] = useState<{
    [key: string]: boolean;
  }>({});
  const { productname } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const products: IProducts = useSelector((state: RootState) => state.products);
  //console.log(products);
  const loading: ILoading = useSelector((state: RootState) => state.loading);
  //console.log(`loading ${JSON.stringify(loading)}`);
  const dialog = useSelector((state: RootState) => state.dialogbox);
    const handleAddToCart = (product: IProductsData[] | any) => {
    setDisabledButtonAddToCart({ [product.id]: true });
    dispatch(setAddToCart());
    dispatch(setCartItems(product));
    setTimeout(() => {
      setDisabledButtonAddToCart({ [product.id]: false });
    }, 500);
  };

  const handleImage = (image: string) => {
    dispatch(setIsOpen(true));
    dispatch(setImageToOpen(image));
  };
  const closeDialog = () => {
    dispatch(setIsOpen(false));
  };
  const handleBuyNow = (clickedProduct: IProductsData[]) => {
    // Create a copy of the current state and disable the button for each clicked product
    const updatedDisabledButton = { ...disabledButtonBuyNow };
    //console.log(updatedDisabledButton)
    // Disable the Buy Now button for each product
    clickedProduct.forEach((product: IProductsData) => {
      if (product.id) {
        // Check if 'id' is defined
        updatedDisabledButton[product.id] = true;
      }
    });
    setDisabledButtonBuyNow(updatedDisabledButton);
    dispatch(setBuyNow(clickedProduct));
    setTimeout(() => {
      const resetDisabledButton = { ...updatedDisabledButton };
      //console.log(resetDisabledButton)
      clickedProduct.forEach((product: IProductsData) => {
        if (product.id) {
          // Ensure 'id' is defined before accessing it
          resetDisabledButton[product.id] = false;
        }
      });
      setDisabledButtonBuyNow(resetDisabledButton);
      navigate("/buyNow");
    }, 1000);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      const product: IProductsData[] = (products.products ?? []).filter(
        (element: IProductsData) => {
          //console.log(`element ${element}`);
          return element.name?.toLowerCase() === productname?.toLowerCase();
        }
      );
      //console.log(JSON.stringify(foundProduct));
      dispatch(setClickedProduct(product));
      dispatch(setLoading(false));
    }, 1000);
    return () => clearTimeout(timer);
  }, [productname, dispatch, products.products]);

  return (
    <Box sx={{ padding: 5, marginTop: { xs: 0 } }}>
      <Grid2 container spacing={5}>
        {loading.loading
          ? Array.from(
              { length: products.clickedProduct?.length || 1 },
              (_, index) => {
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
              }
            )
          : products.clickedProduct &&
            products.clickedProduct.length > 0 &&
            products.clickedProduct.map((product) => {
              //console.log(product);
              return (
                <Grid2
                  sx={{
                    gridColumn: {
                      xs: "span 12",
                      sm: "span 6",
                      md: "span 4",
                      lg: "span 4",
                      xl: "span 3",
                    },
                  }}
                  key={product.id}
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
                          onClick={() => {
                            handleImage(product.img ?? "");
                          }}
                        />
                      </ImageList>
                      <Buttons
                        value={constant.addToCart}
                        onClick={() => handleAddToCart(product)}
                        sx={{ marginTop: 1, borderRadius: 2 }}
                        isDisabled={
                          disabledButtonAddToCart[product.id!] ?? false
                        }
                      />
                      <Buttons
                        value={constant.buyNow}
                        sx={{
                          marginTop: 1,
                          borderRadius: 2,
                        }}
                        backgroundColor="var(--orange-color)"
                        onClick={() => {
                          handleBuyNow(products.clickedProduct ?? []);
                        }}
                        isDisabled={disabledButtonBuyNow[product.id!] ?? false}
                      />
                    </Box>
                    <Box className="d-flex flex-column ms-5">
                      {/* ms(margin-left) me(margin-right) */}
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
                            //console.log(product.details)
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
            })}
      </Grid2>
      {dialog.isOpen && (
        <Dialogs
          isOpen={dialog.isOpen}
          isClose={closeDialog}
          image={dialog.imageToOpen}
        />
      )}
    </Box>
  );
};
export default Product;
