import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_ORDER_BY_ID_FAILURE,
  GET_ORDER_BY_ID_REQUEST,
  GET_ORDER_BY_ID_SUCCESS,
  GET_USER_ORDERS_FAILURE,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAILURE,
} from "./ActionType";

const initialState = {
  orders: [],
  order: null,
  error: null,
  loading: false,
  success: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
    case GET_ORDER_BY_ID_REQUEST:
    case GET_USER_ORDERS_REQUEST:
    case CANCEL_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
        error: null,
      };

    case GET_USER_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
        error: null,
      };

    case GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        error: null,
      };

    case CANCEL_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        order: action.payload,
        error: null,
      };

    case CREATE_ORDER_FAILURE:
    case GET_ORDER_BY_ID_FAILURE:
    case GET_USER_ORDERS_FAILURE:
    case CANCEL_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
