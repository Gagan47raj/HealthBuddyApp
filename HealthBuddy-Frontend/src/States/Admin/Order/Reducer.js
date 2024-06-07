import { deleteOrder } from "./Action";
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
  PLACED_ORDERS_FAILURE,
  PLACED_ORDERS_REQUEST,
  PLACED_ORDERS_SUCCESS,
  SHIP_ORDERS_FAILURE,
  SHIP_ORDERS_REQUEST,
  SHIP_ORDERS_SUCCESS,
} from "./ActionType";

const initialState = {
  loading: false,
  orders: [],
  error: "",
  confirmed: false,
  shipped: false,
  delivered: false,
  deleteOrder: false,
};

const adminOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };
    case GET_ORDERS_FAILURE:
      return {
        loading: false,
        orders: [],
        error: action.payload,
      };
    case CONFIRM_ORDERS_REQUEST:
    case PLACED_ORDERS_REQUEST:
    case DELIVERED_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CONFIRM_ORDERS_SUCCESS:
      return {
        ...state,
        confirmed: action.payload,
        isLoading: false,
      };
    case PLACED_ORDERS_SUCCESS:
      return {
        ...state,
        placed: action.payload,
        isloading: false,
      };

    case DELIVERED_ORDERS_SUCCESS:
      return {
        ...state,
        delivered: action.payload,
        isLoading: false,
      };
    case CONFIRM_ORDERS_FAILURE:
    case PLACED_ORDERS_FAILURE:
    case DELIVERED_ORDERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case DELETE_ORDERS_REQUEST:
      return { ...state, loading: true };
    case DELETE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        deleteOrder: action.payload,
      };
    case DELETE_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SHIP_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case SHIP_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        shipped: action.payload,
      };
    case SHIP_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default adminOrderReducer;
