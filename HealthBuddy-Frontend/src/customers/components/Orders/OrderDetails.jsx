import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTrakering from "../Orders/OrderTracking";
import { Box, Button, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { StarBorderOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { cancelOrder, getOrderById } from "../../../States/Order/Action";

const OrderDetails = () => {
  const dispatch = useDispatch();
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  const { orderId } = useParams();
  const { order, isLoading, error } = useSelector((store) => store.order);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);


  // console.log("order _> ",order);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!order) return <div>Order not found</div>;

  const handleCancelOrder = () => {
    dispatch(cancelOrder(orderId));
  };

  let step = 0;
  const orderStatus = () => {
    
    if (order.orderStatus === "PENDING") {
        return "Please Complete Payment First";
    }
    else if (order.orderStatus === "CANCELLED") {
      return "Your order is cancelled";
    }
    else if (order.orderStatus === "PLACED") {
      step = 0;
    }
    else if (order.orderStatus === "CONFIRMED") {
      step = 1;
    }
    else if (order.orderStatus === "SHIPPED") {
      step = 2;
    }
    else if (order.orderStatus === "DELIVERED") {
      step = 3;
    }
  };

  return (
    <div className="px-5 lg:px-20">
      <div>
        <h1 className="font-bold text-xl py-7">Delivery Address</h1>
        <AddressCard address={order?.address} showButton={false} />
      </div>

      <div className="py-10 lg:px-15">
        {orderStatus() ? (
          <div className="text-center border p-5">
            {orderStatus()}
          </div>
        ) : (
          <OrderTrakering activeStep={step} />
        )}
      </div>

      <Grid className="space-x-5" container>
        {order.orderItems.map((item) => (
          <Grid
            item
            container
            className="shadow-xl rounded-md p-5 border"
            sx={{ alignContent: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item.product.imageUrl}
                  alt=""
                />

                <div className="space-y-2 ml-5">
                  <p className="font-semibold">{item.product.name}</p>

                  <p className="space-x-5 opacity-50 text-xs font-semibold">
                    <span>Brand : {item.product.brand}</span>
                    <span>Quantity : {item.quantity}</span>
                  </p>
                  <p>Seller : Health Buddy</p>
                  <p>₹{item.price}</p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <Box sx={{ color: deepPurple[500] }}>
                <StarBorderOutlined
                  sx={{ fontSize: "2rem" }}
                  fontSize={"2px"}
                  className="px-2"
                />
                <span>Rate & Review Product</span>
                <br />
                    <br />
                    <span>
                    <Button  className='ml-5' variant='outlined' onClick={handleCancelOrder} disabled={order.orderStatus === "CANCELLED"}>Cancel Order</Button>
                    </span>
              </Box>
              
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
