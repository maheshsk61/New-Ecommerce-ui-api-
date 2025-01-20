import { Box, Card, Grid2, Typography, Skeleton } from "@mui/material";
import { IProducts, IProductsData, ISearchQuery } from "../../interface";
import { Link } from "react-router-dom";
import { constant } from "../../constant";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const ProductView: React.FC<IProducts> = ({
  products,
  loading,
}): JSX.Element => {
  const searchQuery: ISearchQuery = useSelector(
    (state: RootState) => state.search
  );
  const query: string = searchQuery.query?.toLowerCase() ?? "";
  const filteredProducts: IProductsData[] = (products ?? []).filter(
    (product) => {
      return product.name?.toLowerCase().includes(query);
    }
  );
  // console.log(`filteredProducts ${JSON.stringify(filteredProducts)}`);
  const notFilteredProducts: IProductsData[] = (products ?? []).filter(
    (product) => {
      return !product.name?.toLowerCase().includes(query);
    }
  );
  // console.log(`notFilteredProducts ${JSON.stringify(notFilteredProducts)}`);
  const sortedFilteredProducts: IProductsData[] = [
    ...filteredProducts,
    ...notFilteredProducts,
  ];
  //console.log(`sortedFilteredProducts ${JSON.stringify(sortedFilteredProducts)}`);

  return (
    <Box sx={{ padding: 5, marginTop: { xs: 0 }}}>
      <Grid2 container columnSpacing={2} rowSpacing={2}>
        {loading
          ? Array.from({ length: 20 }, (_, index) => {
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
                      background: "var(--skeleton-color)",
                    }}
                  >
                    <Box className="d-flex justify-content-center ">
                      <Skeleton
                        variant="rectangular"
                        width={200}
                        height={200}
                      />
                    </Box>
                  </Card>
                </Grid2>
              );
            })
          : sortedFilteredProducts &&
            sortedFilteredProducts.length > 0 &&
            sortedFilteredProducts.map((product: IProductsData, index) => {
              return (
                <Grid2
                  sx={{
                    marginBottom:
                      index === sortedFilteredProducts.length - 1 ? 0 : 1,
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
                    to={`/${encodeURIComponent(product.name ?? "")}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ width: "250px", padding: 2 }}>
                      <img
                        src={product.img}
                        alt={product.name}
                        style={{
                          width: 200,
                          height: 200,
                          margin: "0 auto",
                          objectFit: "cover",
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          display: "-webkit-box", // Use a flexible box layout
                          WebkitBoxOrient: "vertical", // Set the box to be oriented vertically
                          overflow: "hidden", // Hide overflow text
                          WebkitLineClamp: 3, // Limit to 3 lines
                          textOverflow: "ellipsis", // Add ellipsis when the text overflows
                          maxWidth: 200, // Set a max width to apply the ellipsis
                          textAlign: "center", // Align text in the center if needed
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                        variant="h6"
                      >
                        {constant.rupees}
                        {product.price}
                      </Typography>
                    </Card>
                  </Link>
                </Grid2>
              );
            })}
      </Grid2>
    </Box>
  );
};
export default ProductView;
