import { useDispatch, useSelector } from "react-redux";
import { constant } from "../../constant";
import Dialogs from "../reuse-components/dialog/dialog";
import { AppDispatch, RootState } from "../../Redux/store";
import React, { Fragment, useEffect, useState } from "react";
import { setIsOpen } from "../../Redux/slices/dialog-box";

const Order: React.FC = (): JSX.Element => {
  const [shipmentId, setShipmentId] = useState<string>("");
  const dialog = useSelector((state: RootState) => state.dialogbox);
  const userDetails = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const closeDialog = () => {
    dispatch(setIsOpen(false));
  };
  useEffect(() => {
    dispatch(setIsOpen(true));
  }, [dispatch]);
  useEffect(() => {
    let shipmentId = localStorage.getItem("shipmentId");
    if (shipmentId) {
      setShipmentId(shipmentId);
    }
  }, [shipmentId]);

  return (
    <Fragment>
      {dialog.isOpen && (
        <Dialogs
          isOpen={dialog.isOpen}
          isClose={closeDialog}
          orderText={`${constant.thankYouForYourOrder}${" "}${
            userDetails.user && userDetails.user.firstName
          }${userDetails.user && userDetails.user.lastName}`}
          text={`Your order is confirmed and being prepared for shipment. Your Shipment ID is ${shipmentId}.`}
        />
      )}
    </Fragment>
  );
};

export default Order;
