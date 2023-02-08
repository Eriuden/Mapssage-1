import axios from "axios";

export const GET_SALONS= "GET_SALONS"

export const getSalons = () => {
    return (dispatch) => {
        return axios 
        .get(`${process.env.REACT_APP_API_URL}/api/salon`)
        .then((res) => {
            dispatch({ type: GET_SALONS, payload: res.data})
        })
        .catch((err)=> {
            window.alert(err)
        })
    }
}