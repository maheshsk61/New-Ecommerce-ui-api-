import { useEffect, useState } from "react";
import { productLists } from "../../api";
import { Box, Grid2, Card, Avatar, Typography, Skeleton } from "@mui/material";
import "./product-list.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux/store";
import { setList } from "../../Redux/slices/product-lists";
import { IProduct, IProductList, ISearchQuery } from "../../interface";
import { constant } from "../../constant";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

const ProductList: React.FC = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const lists: IProductList = useSelector(
    (state: RootState) => state.productLists
  );
  //console.log(`lists ${lists}`);
  const searchQuery: ISearchQuery = useSelector(
    (state: RootState) => state.search
  );
  //console.log(`searchQuery ${searchQuery.query}`)
  const filteredProducts = (lists.list ?? []).filter((product) => {
    const query: string = searchQuery.query?.toLowerCase() ?? "";
    return product.name?.toLowerCase().includes(query);
  });
  //console.log(`filteredProducts ${filteredProducts}`)

  useEffect(() => {
    const getProductLists = async () => {
      try {
        const response = await productLists();
        setTimeout(() => {
          dispatch(setList(response.productLists));
          setLoading(false);
        }, 2000);
      } catch (error) {
        return Promise.reject(error);
      }
    };
    getProductLists();
  }, [dispatch]);

  return (
    <Box sx={{ padding: 5, marginTop: 10 }}>
      <Grid2 container spacing={5}>
        {loading ? (
          Array.from({ length: lists.length || 21 }, (_, index) => {
            return (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    padding: 2,
                    borderRadius: 20,
                    background: "var(--silver-color)",
                  }}
                >
                  <Box className="d-flex justify-content-center ">
                    <Skeleton variant="circular" width={200} height={200} />
                  </Box>
                </Card>
              </Grid2>
            );
          })
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product: IProduct) => {
            return (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <Card
                  sx={{ width: "fitContent", padding: 2, borderRadius: 20 }}
                  className="card"
                >
                  <Avatar
                    src={`http://localhost:4000${product.imageUrl}`}
                    alt={product.name}
                    sx={{
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      margin: "0 auto",
                    }}
                  />
                  <Typography variant="h6" sx={{ textAlign: "center" }}>
                    {product.name}
                  </Typography>
                </Card>
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
