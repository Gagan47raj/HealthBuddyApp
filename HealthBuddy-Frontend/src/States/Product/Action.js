import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_FAILURE, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS } from "./ActionType";
import { API_BASE_URL, api } from "../../Config/apiConfig"

export const findProducts = (reqData) => async (dispatch) => {
    dispatch({type:FIND_PRODUCT_REQUEST})
  const {
    category,
    minPrice,
    maxPrice,
    minDiscount,
    sortBy,
    stock,
    severity = '',
    medicineType = '',
    pageNumber,
    pageSize,
    searchKey
  } = reqData;

  try {
    let queryParams = [];

    if (category !== undefined) queryParams.push(`category=${category}`);
    if (minPrice !== undefined) queryParams.push(`minPrice=${minPrice}`);
    if (maxPrice !== undefined) queryParams.push(`maxPrice=${maxPrice}`);
    if (minDiscount !== undefined) queryParams.push(`minDiscount=${minDiscount}`);
    if (sortBy !== undefined) queryParams.push(`sortBy=${sortBy}`);
    if (stock !== undefined) queryParams.push(`stock=${stock}`);
    
    // if (severity !== undefined) queryParams.push(`severity=${severity}`);
    // if (medicineType !== undefined) queryParams.push(`medicineType=${medicineType}`);
    queryParams.push(`severity=${severity}`);
    queryParams.push(`medicineType=${medicineType}`);

    if (pageNumber !== undefined) queryParams.push(`pageNumber=${pageNumber}`);
    if (pageSize !== undefined) queryParams.push(`pageSize=${pageSize}`);
    if (searchKey) queryParams.push(`searchKey=${searchKey}`);

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    console.log("queryString : ",queryString)

    // const {data} = await api.get(`/api/products?category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&sortBy=${sortBy}&stock=${stock}&severity=${severity}&medicineType${medicineType}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
    const {data} = await api.get(`/api/products${queryString}`)
    
    console.log("products : ",data)
    dispatch({type:FIND_PRODUCT_SUCCESS, payload:data})
    
} catch (error) {
    dispatch({type:FIND_PRODUCT_FAILURE, payload:error.message})
}
};


export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({type:FIND_PRODUCT_BY_ID_REQUEST})
  const {
    productId
  } = reqData;
  console.log(productId)
  try {
    const {data} =await api.get(`/api/product/id/${productId}`)
    console.log(data)
    dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS, payload:data})
} catch (error) {
    dispatch({type:FIND_PRODUCT_BY_ID_FAILURE, payload:error.message})
}
};

export const createProduct=(product)=>async(dispatch)=>{
  try {
    dispatch({type:CREATE_PRODUCT_REQUEST})
    const {data} = await api.post(`/api/admin/products/`,product);
    dispatch({type:CREATE_PRODUCT_SUCCESS,payload:data})
  } catch (error) {
    dispatch({type:CREATE_PRODUCT_FAILURE,payload:error.message})
  }
}

export const deleteProduct=(productId)=>async(dispatch)=>{
  try {
    dispatch({type:DELETE_PRODUCT_REQUEST})
    const {data} = await api.delete(`/api/admin/products/${productId}/delete`);
    dispatch({type:DELETE_PRODUCT_SUCCESS,payload:productId})
  } catch (error) {
    dispatch({type:DELETE_PRODUCT_FAILURE,payload:error.message})
  }
}