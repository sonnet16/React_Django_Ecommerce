import axios from 'axios'

import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_LATEST_REQUEST,
    PRODUCT_LATEST_SUCCESS,
    PRODUCT_LATEST_FAIL

 } from '../Constants/ProductConstant'

 export const listProducts = (keyword = '') => async (dispatch) =>{
     try{
         dispatch({type: PRODUCT_LIST_REQUEST})

         const { data } = await axios.get(`api/products/${keyword}`)

         dispatch({
             type: PRODUCT_LIST_SUCCESS,
             payload: data
         })
     }catch(error){
         dispatch({
             type: PRODUCT_LIST_FAIL,
             payload: error.response && error.response.data.detail 
                ? error.response.data.detail
                : error.message
         })
     }
 }


 export const listProductDetails = (id) => async (dispatch) =>{
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const { data } = await axios.get(`api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
               ? error.response.data.detail
               : error.message
        })
    }
}


export const latestProducts = () => async (dispatch) =>{
    try{
        dispatch({type: PRODUCT_LATEST_REQUEST})

        const { data } = await axios.get(`api/products/latest`)

        dispatch({
            type: PRODUCT_LATEST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_LATEST_FAIL,
            payload: error.response && error.response.data.detail 
               ? error.response.data.detail
               : error.message
        })
    }
}