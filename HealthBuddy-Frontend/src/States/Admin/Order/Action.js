import { api } from "../../../Config/apiConfig";
import {
  CONFIRM_ORDERS_FAILURE,
  CONFIRM_ORDERS_REQUEST,
  CONFIRM_ORDERS_SUCCESS,
  DELETE_ORDERS_FAILURE,
  DELETE_ORDERS_REQUEST,
  DELETE_ORDERS_SUCCESS,
  DELIVERED_ORDERS_FAILURE,
  DELIVERED_ORDERS_REQUEST,
  DELIVERED_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  SHIP_ORDERS_FAILURE,
  SHIP_ORDERS_REQUEST,
  SHIP_ORDERS_SUCCESS,
} from "./ActionType";

export const getOrders = (reqData) => {
  console.log("get all orders : ", reqData);
  return async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });
    try {
      const response = await api.get(`api/admin/orders/`);
      console.log("get all orders ", response.data);
      dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("catch error : ", error);
      dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
    }
  };
};

export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch({ type: CONFIRM_ORDERS_REQUEST });
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/confirmed`);

    const data = response.data;
    console.log("confirm_order", data);
    dispatch({ type: CONFIRM_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CONFIRM_ORDERS_FAILURE, payload: error.message });
  }
};

export const shipOrder = (orderId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SHIP_ORDERS_REQUEST });
      const { data } = await api.put(`/api/admin/orders/${orderId}/ship`);
      console.log(" shipped order", data);
      dispatch({ type: SHIP_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SHIP_ORDERS_FAILURE, payload: error.message });
    }
  };
};

export const deliveredOrder = (orderId) => async (dispatch) => {
  dispatch({ type: DELIVERED_ORDERS_REQUEST });
  try {
    const response = await api.put(`/api/admin/orders/${orderId}/deliver`);
    const data = response.data;
    console.log("delivered order", data);
    dispatch({ type: DELIVERED_ORDERS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELIVERED_ORDERS_FAILURE, payload: error.message });
  }
};

export const deleteOrder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ORDERS_REQUEST });
    try {
      const { data } = await api.delete(`/api/admin/orders/${orderId}/delete`);
      console.log("delete order ", data);
      dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: DELETE_ORDERS_FAILURE, payload: error.message });
    }
  };
};


