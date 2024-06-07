import axios from "axios";
import { API_BASE_URL } from "../../Config/apiConfig";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";

const token = localStorage.getItem("jwt");

const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const register = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch(registerSuccess(user.jwt));
    console.log("User", user);
  } catch (error) {
    if (error.response && error.response.data) {
      // Server responded with a status other than 2xx
      dispatch(
        registerFailure(error.response.data.message || "Registration failed")
      );
    } else if (error.request) {
      // Request was made but no response was received
      dispatch(registerFailure("No response from server"));
    } else {
      // Something happened in setting up the request
      dispatch(registerFailure(error.message));
    }
  }
};

const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const login = (userData) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;

    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
    }
    dispatch(loginSuccess(user.jwt));
    console.log("User", user);
  } catch (error) {
    if (error.response && error.response.data) {
      // Server responded with a status other than 2xx
      dispatch(loginFailure(error.response.data.message || "Login failed"));
    } else if (error.request) {
      // Request was made but no response was received
      dispatch(loginFailure("No response from server"));
    } else {
      // Something happened in setting up the request
      dispatch(loginFailure(error.message));
    }
  }
};

const getUserRequest = () => ({
  type: GET_USER_REQUEST,
});

const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = response.data;
    console.log("User", user);
    dispatch(getUserSuccess(user));
  } catch (error) {
    if (error.response && error.response.data) {
      dispatch(
        getUserFailure(error.response.data.message || "Failed to fetch user")
      );
    } else if (error.request) {
      dispatch(getUserFailure("No response from server"));
    } else {
      dispatch(getUserFailure(error.message));
    }
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
};
