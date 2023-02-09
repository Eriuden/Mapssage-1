import axios from "axios";

export const GET_SALONS = "GET_SALONS"
export const GET_SALON = "GET_SALON"
export const ADD_SALON = "ADD_SALON"
export const FAV_SALON = "FAV_SALON"
export const UNFAV_SALON = "UNFAV_SALON"
export const UPDATE_SALON = "UPDATE_SALON"
export const DELETE_SALON = "DELETE_SALON"

export const ADD_COMMENT= "ADD_COMMENT"
export const EDIT_COMMENT= "EDIT_COMMENT"
export const DELETE_COMMENT= " DELETE_COMMENT"

export const GET_SALON_ERRORS = "GET_SALON_ERROR"

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

export const addSalon = (data) => {

    return (dispatch) => {
        return axios 
        .post(`${process.env.REACT_APP_API_URL}api/salon/`, data)
        .then((res) => {
            if (res.data.errors) {
                dispatch({type: GET_SALON_ERRORS, payload: res.data.errors})
            } else {
                dispatch({ type: GET_SALON_ERRORS, payload:""})
            }
        })
    }

}

export const updateSalon = (salonId, name, address, cp, town, massage, potentialClients, employeesGender) => {
    return (dispatch) => {
        return axios({
            method:"put",
            url: `${process.env.REACT_APP_API_URL}api/salon/${salonId}`,
            data: { name, address, cp, town, massage, potentialClients
            , employeesGender}
        })
        .then((res) => {
            dispatch({ type: UPDATE_SALON, payload: { name, address, cp, town, massage, potentialClients, employeesGender}})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}

export const favSalon = (salonId, userId) => {
    return (dispatch) => {
        return axios({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/salon/fav-salon/`+ salonId,
            data: {userId}
        })
        .then((res) => {
            dispatch({ type: FAV_SALON, payload: {salonId, userId} })
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}

export const unFavSalon = (salonId, userId) => {
    return (dispatch) => {
        return axios ({
            method:"patch",
            url: `${process.env.REACT_APP_API_URL}api/salon/unfav-salon/` + salonId,
            data: {userId}
        })
        .then((res) => {
            dispatch({ type: UNFAV_SALON, payload: { salonId, userId}})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}

export const deleteSalon = (salonId, name, address, cp, town, massage, potentialClients, employeesGender) => {
    return (dispatch) => {
        return axios({
            method:"delete",
            url: `${process.env.REACT_APP_API_URL}api/salon/delete-salon/` + salonId,
            data: { name, address, cp, town, massage, potentialClients, employeesGender}
        })
        .then((res) => {
            dispatch({ type: DELETE_SALON, payload: { salonId}})
        })
        .catch((err) => {
            window.alert(err)
        })  
    }
}

export const addComment = (salonId, commentId, commenterName, text) => {
    return (dispatch) => {
        return axios({
            method:'patch',
            url: `${process.env.REACT_APP_API_URL}api/salon/add-comment/${salonId}`,
            data: { commentId, commenterName, text},
        })
        .then((res) => {
            dispatch({ type: ADD_COMMENT, payload: { salonId}})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}

export const editComment = (salonId, commentId, text) => {
    return (dispatch) => {
        return axios({
            method:"put",
            url: `${process.env.REACT_APP_API_URL}api/salon/edit-comment/${salonId}`,
            data: { commentId, text}
        })
        .then((res) => {
            dispatch({ type: EDIT_COMMENT, payload: {salonId, commentId, text}})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}

export const deleteComment = (salonId, commentId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}api/salon/delete-comment/${salonId}`,
            data: { commentId, text}
        })
        .then((res) => {
            dispatch({ type: DELETE_COMMENT, payload: { commentId}})
        })
        .catch((err) => {
            window.alert(err)
        })
    }
}





