import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../States/Order/Action";
import { updatePaymnet } from "../../../States/Payment/Action";
import { Alert, AlertTitle, Grid } from "@mui/material";
import OrderTracking from "../Orders/OrderTracking";
import AddressCard from "../AddressCard/AddressCard";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState();
  const [referenceId, setReferenceId] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    setPaymentId(urlParam.get("razorpay_payment_id"));
    setPaymentStatus(urlParam.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId) {
      const data = { orderId, paymentId };
      dispatch(getOrderById(orderId));
      dispatch(updatePaymnet(data));
    }
  }, [orderId, paymentId]);

  return (
    <div className="px-2 lg:px-36">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <center>
            <AlertTitle>Payment Success</AlertTitle>
            Congratulations your payment is successfull <br />
            Your Order Will Be Placed Soon
          </center>
        </Alert>
      </div>

      <OrderTracking activeStep={1} />

      {order.order?.orderItems.map((item) => (
        <Grid container className="space-y-5 py-3 pt-20">
          <Grid
            container
            item
            className="shadow-xl rounded-md p-5"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item.product.imageUrl}
                  alt=""
                />

                <div className="ml-5 space-y-2">
                  <p className="font-semibold">{item.product.name}</p>
                  <div className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Size : {item.product.quantity}</span>
                  </div>
                  <p>Seller : {item.product.brand}</p>
                  <p>₹ {item.price}</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <AddressCard address={order.order?.address} showButton={false}/>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};

export default PaymentSuccess;
