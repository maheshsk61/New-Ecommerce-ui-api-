import { useParams } from "react-router-dom";
import { IProducts, IProductsData } from "../../interface";
import { Box, Grid2, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Buttons from "../reuse-components/button/button";
import { constant } from "../../constant";

const Product: React.FC<IProductsData> = (): JSX.Element => {
  const { productname } = useParams();
  const products: IProducts = useSelector((state: RootState) => state.products);
  const foundProduct = (products.products ?? []).filter((element: any) => {
    //console.log(`element ${element}`);
    return element.name.toLowerCase() === productname?.toLowerCase();
  });
  //console.log(JSON.stringify(foundProduct));

  return (
    <Box sx={{ padding: 5, marginTop: 10 }}>
      <Grid2 container spacing={5}>
        {foundProduct &&
          foundProduct.length > 0 &&
          foundProduct.map((product) => {
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
                className="d-flex"
              >
                <Box className="d-flex flex-column">
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: 500, height: 500 }}
                  />
                  <Buttons value={constant.addToCart} />
                </Box>
                <Box className="d-flex flex-column ms-5">
                  {/* ms(margin-left) me(margin-right) */}
                  <Typography variant="h4" sx={{ marginBottom: 2 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="h4">₹{product.price}</Typography>
                </Box>
              </Grid2>
            );
          })}
      </Grid2>
    </Box>
  );
};
export default Product;
