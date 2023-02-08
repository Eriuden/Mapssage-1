import axios from "axios";

export const GET_SALONS = "GET_SALONS"
export const GET_SALON = "GET_SALON"

export const getSalons = () => {
    return (dispatch) => {
        return axios 
        .get(`${process.env.REACT_APP_API_URL}/api/salon`)
        .then((res) => {
            const array = res.data.slice(0,num)
            dispatch({type: GET_SALON, payload: array})
            dispatch({ type: GET_SALONS, payload: res.data})
        })
        .catch((err)=> {
            window.alert(err)
        })
    }
}