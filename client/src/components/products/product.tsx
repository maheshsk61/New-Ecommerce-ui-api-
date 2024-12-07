import { useParams } from "react-router-dom";
import { ILoading, IProducts, IProductsData } from "../../interface";
import { Box, Card, Grid2, Skeleton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import Buttons from "../reuse-components/button/button";
import { constant } from "../../constant";
import { setAddToCart, setCartItems } from "../../Redux/slices/handle-buttons";
import { setLoading } from "../../Redux/slices/loading";
import { useEffect } from "react";
import { setClickedProduct } from "../../Redux/slices/products";

const Product: React.FC<IProductsData> = (): JSX.Element => {
  const { productname } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const products: IProducts = useSelector((state: RootState) => state.products);
  console.log(products);
  const loading: ILoading = useSelector((state: RootState) => state.loading);
  //console.log(`loading ${JSON.stringify(loading)}`);

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

  const handleAddToCart = (product: IProductsData[] | any) => {
    dispatch(setAddToCart());
    dispatch(setCartItems(product));
  };

  return (
    <Box sx={{ padding: 5, marginTop: 7 }}>
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
                    <Skeleton variant="rectangular" width={1600} height={400} />
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
                  <Card className="d-flex p-3">
                    <Box className="d-flex flex-column">
                      <img
                        src={product.img}
                        alt={product.name}
                        style={{ width: 400, height: 300 }}
                      />
                      <Buttons
                        value={constant.addToCart}
                        onClick={() => handleAddToCart(product)}
                      />
                    </Box>
                    <Box className="d-flex flex-column ms-5">
                      {/* ms(margin-left) me(margin-right) */}
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
    </Box>
  );
};
export default Product;
