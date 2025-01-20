import { Box, Card, Grid2, Typography } from "@mui/material";
import { constant } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import React, { useEffect, useState } from "react";
import Buttons from "../reuse-components/button/button";
import {
  setRemoveFromBuyNow,
  setBuyNowFromLocalStoage,
} from "../../Redux/slices/handle-buttons";
import { setUser } from "../../Redux/slices/user";
import PriceTable from "../reuse-components/price-table/price-table";
import {
  resetAmounts,
  setGrandTotal,
  setSubTotal,
  setTaxPrice,
} from "../../Redux/slices/amount";

const BuyNow: React.FC = (): JSX.Element => {
  const [disabledButtonBuyNow, setDisabledButtonBuyNow] = useState<{
    [key: string]: boolean;
  }>({});
  const userDetails = useSelector((state: RootState) => state.user);
  const amount = useSelector((state: RootState) => state.amount);
  const buttons = useSelector((state: RootState) => state.buttons);
  const dispatch = useDispatch<AppDispatch>();
  //console.log(buttons);
  const handleRemove = (product: any, index: number) => {
    setDisabledButtonBuyNow({ [index]: true });
    setTimeout(() => {
      dispatch(setRemoveFromBuyNow(product.id));
      setDisabledButtonBuyNow({ [index]: false });
      window.location.reload();
    }, 1000);
    if (buttons.buyNow.length === 0) {
      dispatch(resetAmounts());
    }
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    if (storedUser) {
      dispatch(setUser(storedUser));
    }
  }, [dispatch]);

  useEffect(() => {
    const storedInBuyNow = JSON.parse(localStorage.getItem("buyNow") || "{}");
    //console.log(storedInBuyNow)
    if (storedInBuyNow.length > 0) {
      dispatch(setBuyNowFromLocalStoage(storedInBuyNow));
    }
    let subTotal = 0;
    storedInBuyNow.forEach((product: any) => {
      subTotal += product.price;
    });
    let taxPrice = Math.trunc(subTotal * amount.taxPercentage);
    dispatch(setSubTotal(subTotal));
    dispatch(setTaxPrice(taxPrice));
    dispatch(setGrandTotal(subTotal + taxPrice));
  }, [dispatch]);

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
      <Card
        className="p-3"
        sx={{
          margin: "10px 50px",
          width: "auto",
          height: "auto",
          background: "var(--silver-color)",
          textAlign: "center",
        }}
        id="customer-details"
      >
        {userDetails.user && (
          <React.Fragment>
            <Typography variant="h5" sx={{ textDecoration: "underline" }}>
              {constant.customerDetails}
            </Typography>
            <Typography component="p">
              <b>{constant.firstName.toUpperCase()}</b> :{" "}
              {userDetails.user.firstName.toUpperCase()}
            </Typography>
            <Typography component="p">
              <b>{constant.lastName.toUpperCase()}</b> :{" "}
              {userDetails.user.lastName.toUpperCase()}
            </Typography>
            <Typography component="p">
              <b>{constant.mobileNumber.toUpperCase()}</b> :{" "}
              {userDetails.user.countryCode} {userDetails.user.mobileNumber}
            </Typography>
            <Typography component="p">
              <b>{constant.email.toUpperCase()}</b> :{" "}
              {userDetails.user.email.toLowerCase()}
            </Typography>
            <Typography component="p">
              <b>{constant.deliveryAddress.toUpperCase()}</b> :{" "}
              {userDetails.user.address}
            </Typography>
          </React.Fragment>
        )}
      </Card>
      <Card id="order-summary" className="p-3" sx={{ margin: "10px 50px" }}>
        <React.Fragment>
          <Box
            sx={{
              background: "var(--black-color)",
              color: "var(--white-color)",
              padding: 1,
              borderRadius: 1,
              mb: 1,
            }}
          >
            <Typography>{constant.orderSummary}</Typography>
          </Box>
          {buttons.buyNow.length > 0 ? (
            buttons.buyNow.map((product, index) => {
              //console.log(`product ${JSON.stringify(product)}`);
              return (
                <Box className="d-flex flex-column" key={index} sx={{ mb: 2 }}>
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: 300, height: 150 }}
                  />
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="h6">
                    <b>
                      {constant.rupees} {product.price}
                    </b>
                  </Typography>
                  <Buttons
                    value={constant.remove}
                    backgroundColor="var(--red-color)"
                    onClick={() => {
                      handleRemove(product, index);
                    }}
                    isDisabled={disabledButtonBuyNow[index]}
                  />
                </Box>
              );
            })
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Please buy products to see order summary.
            </Typography>
          )}
          <Box sx={{ textAlign: "left", marginTop: 2 }}>
            {buttons.buyNow.length > 0 && (
              <PriceTable
                subTotal={amount.subTotal}
                taxPrice={amount.taxPrice}
                grandTotal={amount.grandTotal}
              />
            )}
          </Box>
        </React.Fragment>
      </Card>
    </Grid2>
  );
};
export default BuyNow;
