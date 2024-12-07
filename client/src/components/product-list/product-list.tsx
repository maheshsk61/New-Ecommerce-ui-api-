import { useEffect } from "react";
import { productLists } from "../../api";
import { Box, Card, Typography, Skeleton, Grid2 } from "@mui/material";
import "./product-list.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { setList } from "../../Redux/slices/product-lists";
import { setLoading } from "../../Redux/slices/loading";
import {
  ILoading,
  IProduct,
  IProductList,
  IProductsData,
  ISearchQuery,
} from "../../interface";
import { constant } from "../../constant";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";

const ProductList: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const lists: IProductList = useSelector(
    (state: RootState) => state.productLists
  );
  //console.log(`lists ${lists}`);
  const loading: ILoading = useSelector((state: RootState) => state.loading);
  //console.log(`loading ${JSON.stringify(loading)}`);
  const searchQuery: ISearchQuery = useSelector(
    (state: RootState) => state.search
  );
  //console.log(`searchQuery ${searchQuery.query}`)
  const filteredProducts: IProductsData[] = (lists.list ?? []).filter(
    (product) => {
      const query: string = searchQuery.query?.toLowerCase() ?? "";
      return product.name?.toLowerCase().includes(query);
    }
  );
  //console.log(`filteredProducts ${filteredProducts}`)

  useEffect(() => {
    const getProductLists = async () => {
      try {
        const response = await productLists();
        setTimeout(() => {
          dispatch(setLoading(true));
          dispatch(setList(response.productLists));
          dispatch(setLoading(false));
        }, 1000);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        dispatch(setLoading(true));
      }
    };
    getProductLists();
  }, [dispatch]);

  return (
    <Box sx={{ padding: 5, marginTop: 7 }}>
      <Grid2 container spacing={5}>
        {loading.loading ? (
          Array.from({ length: lists.length || 21 }, (_, index) => {
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
                <Card
                  sx={{
                    width: "250px",
                    padding: 2,
                    borderRadius: 5,
                    background: "var(--skeleton-color)",
                  }}
                >
                  <Box className="d-flex justify-content-center ">
                    <Skeleton variant="rectangular" width={200} height={200} />
                  </Box>
                </Card>
              </Grid2>
            );
          })
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product: IProduct) => {
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
              >
                <Link
                  to={`${product.name}s`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{ width: "250px", padding: 2, borderRadius: 5 }}
                    className="card"
                  >
                    <img
                      src={`http://localhost:4000${product.imageUrl}`}
                      alt={product.name}
                      style={{
                        width: 200,
                        height: 200,
                        margin: "0 auto",
                        objectFit: "cover",
                      }}
                    />
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                      {product.name}
                    </Typography>
                  </Card>
                </Link>
              </Grid2>
            );
          })
        ) : (
          <Box className="d-flex justify-content-center w-100">
            <Typography variant="h5">
              <i>{constant.noProductsFound}</i>
              <SentimentVeryDissatisfiedIcon />
            </Typography>
          </Box>
        )}
      </Grid2>
    </Box>
  );
};
export default ProductList;
