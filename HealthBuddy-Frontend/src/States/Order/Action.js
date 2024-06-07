import {
  CANCEL_ORDER_FAILURE,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_USER_ORDERS_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
} from "./ActionType";
import { api } from "../../Config/apiConfig";

export const createOrder = (reqData) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    const { data } = await api.post(`/api/orders/`, reqData.address);
    console.log("created order : ", reqData.address);

    if (data.id) {
      reqData.navigate({ search: `step=3&orderId=${data.id}` });
    }
    console.log("created order : ", data);
    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("catch error : ", error);
    dispatch({
      type: CREATE_ORDER_FAILURE,
      payload: error.message,
    });
  }
};



export const getUserOrders = () => async (dispatch, getState) => {
    dispatch({ type: GET_USER_ORDERS_REQUEST });
    const state = getState();
    console.log(localStorage.getItem('jwt'));

    const token = state.auth.token || localStorage.getItem('jwt');
     if (!token) {
        dispatch({
            type: GET_USER_ORDERS_FAILURE,
            payload: 'Token is null',
        });
        return;
    }
  
    try {
      const { data } = await api.get('/api/orders/user', {
        headers: { "Authorization" : `Bearer ${token}` },
      });
      dispatch({
        type: GET_USER_ORDERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_ORDERS_FAILURE,
        payload: error.message,
      });
    }
  };

  export const getOrderById = (orderId) => async (dispatch, getState) => {
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });
    const state = getState();
    const token = state.auth.token || localStorage.getItem('jwt');
  
    try {
      const { data } = await api.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("order by id ", data);
  
      dispatch({
        type: GET_ORDER_BY_ID_SUCCESS,
        payload: data,
      });
      
    } catch (error) {
      console.log("catch ", error);
      dispatch({
        type: GET_ORDER_BY_ID_FAILURE,
        payload: error.message,
      });
    }
  };

 
export const cancelOrder = (orderId) => {
  return async (dispatch) => {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    try {
      const { data } = await api.put(`/api/orders/${orderId}/cancel`);
      console.log("cancel order ", data);
      dispatch({ type: CANCEL_ORDER_SUCCESS, payload: data });
    } catch (error) {
      console.log("catch error", error);
      dispatch({ type: CANCEL_ORDER_FAILURE, payload: error.message });
    }
  };
};
