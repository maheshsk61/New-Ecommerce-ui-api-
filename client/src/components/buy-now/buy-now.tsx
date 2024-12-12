import { Box, Card, Grid2, Typography } from "@mui/material";
import { constant } from "../../constant";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const BuyNow: React.FC = (): JSX.Element => {
  const userDetails = useSelector((state: RootState) => state.user);
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
    >
      <Card className="p-3" sx={{ margin: "10px 50px" }}>
        {userDetails.user && (
          <Box>
            <Box id="customerDetails">
              <Typography variant="h4">{constant.customerDetails}</Typography>
              <Typography variant="h6">
                {constant.firstName.toUpperCase()} :{" "}
                {userDetails.user.firstName.toUpperCase()}
              </Typography>
              <Typography variant="h6">
                {constant.lastName.toUpperCase()} :{" "}
                {userDetails.user.lastName.toUpperCase()}
              </Typography>
              <Typography variant="h6">
                {constant.mobileNumber.toUpperCase()} :{" "}
                {userDetails.user.countryCode} {userDetails.user.mobileNumber}
              </Typography>
              <Typography variant="h6">
                {constant.email} : {userDetails.user.email}
              </Typography>
            </Box>
            <Box id="customerAddress">
              <Typography variant="h4">{constant.deliveryAddress}</Typography>
              <Typography variant="h6">{userDetails.user.address}</Typography>
            </Box>
          </Box>
        )}
      </Card>
    </Grid2>
  );
};
export default BuyNow;
