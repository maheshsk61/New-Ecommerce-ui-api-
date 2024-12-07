import { Box, Card, Grid2, Typography, Skeleton } from "@mui/material";
import { IProducts, IProductsData } from "../../interface";
import { Link } from "react-router-dom";
import { constant } from "../../constant";

const ProductView: React.FC<IProducts> = ({
  products,
  loading,
}): JSX.Element => {
  
  return (
    <Box sx={{ padding: 5, marginTop: 7 }}>
      <Grid2 container spacing={5}>
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
                      borderRadius: 5,
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
          : products &&
            products.length > 0 &&
            products.map((product: IProductsData) => {
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
