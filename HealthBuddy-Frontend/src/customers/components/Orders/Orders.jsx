import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import OrderCard from "./OrderCard";
import { getUserOrders } from "../../../States/Order/Action";

const orderStat = [
  { label: "Order Accepted", value: "order_accepted" },
  { label: "Order Processing", value: "order_processing" },
  { label: "Out For Delivery", value: "out_for_delivery" },
  { label: "Order Delivered", value: "order_delivered" },
  { label: "Order Canceled", value: "order_canceled" },
  { label: "Order Returned", value: "order_returned" },
];

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(orders);

  if (orders.length === 0) {
    return (
    <div className='h-[50vh] flex justify-center items-center'>
     <div className='text-3xl font-bold border p-5 border-gray-300 rounded'>Order is Empty! Purchase First</div>
    </div>)
  } else {
    return (
      <div className="px-5 py-5 lg:px-20">
        <Grid container sx={{ justifyContent: "space-between" }}>
          <Grid item xs={2.5}>
            <div className="h-auto shadow-lg bg-white p-5 sticky top-5">
              <h1 className="font-bold text-lg">Filter</h1>
              <div className="space-y-4 mt-10">
                <h1 className="font-semibold">ORDER STATUS</h1>
                {orderStat.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      defaultValue={option.value}
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      className="ml-3 text-sm text-gray-600"
                      htmlFor={option.value}
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </Grid>
          <Grid item xs={9}>
            <div className="space-y-5">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default Orders;
