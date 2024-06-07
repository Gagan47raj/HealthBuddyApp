import { api } from "../../Config/apiConfig";
import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, FIND_USER_FAILURE, FIND_USER_REQUEST, FIND_USER_SUCCESS } from "./ActionType";

export const findUser = () => async (dispatch) => {
    dispatch({type:FIND_USER_REQUEST});

  try {
    const {data} = await api.get(`/api/users/admin`);
    console.log("user : ",data)
    dispatch({type:FIND_USER_SUCCESS, payload:data})
    
} catch (error) {
    dispatch({type:FIND_USER_FAILURE, payload:error.message})
}
};

export const deleteUser=(userId)=>async(dispatch)=>{
  try {
    dispatch({type:DELETE_USER_REQUEST})
    const {data} = await api.delete(`/api/users/admin/${userId}/delete`);
    dispatch({type:DELETE_USER_SUCCESS,payload:userId})
  } catch (error) {
    dispatch({type:DELETE_USER_FAILURE,payload:error.message})
  }
}

export const getProfile = () => async (dispatch) => {
    dispatch({type:FIND_USER_REQUEST});
  try {
    const {data} = await api.get(`/api/users/profile`);
    console.log("profile : ",data)
    dispatch({type:FIND_USER_SUCCESS, payload:data})
    
} catch (error) {
    dispatch({type:FIND_USER_FAILURE, payload:error.message})
}
}