import { apiConnector } from "../apiconnector"
import { friendsEndpoints} from "../apis"
import { logout } from "./authAPI"
import {getAllUsers} from "../operations/profileAPI"

const { SEND_REQUEST_API,
        ACCEPT_REQUEST_API,
        DELETE_REQUEST_API,
        REJECT_REQUEST_API } = friendsEndpoints


export function sendrequest(token,names,navigate) {
    return async (dispatch) => {
        console.log("token is", token)
        console.log("name of receiver is ", names)
        try {
        const response = await apiConnector("POST", SEND_REQUEST_API, {userName: names}, {
            Authorization: `Bearer ${token || localStorage.getItem("authToken")}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        
        dispatch(getAllUsers());
        } catch (error) {
        console.log("GET_USER_DETAILS API ERROR............", error)
        }
    }
}

export function acceptrequest(token,names,navigate) {
    return async (dispatch) => {
        // dispatch(setLoading(true))
        try {
        const response = await apiConnector("POST", ACCEPT_REQUEST_API, {"userName" : names}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        
        dispatch(getAllUsers());

        } catch (error) {
        dispatch(logout(navigate))
        console.log("GET_USER_DETAILS API ERROR............", error)
        }
        // dispatch(setLoading(false))
    }
}

export function rejectrequest(token,names,navigate) {
    return async (dispatch) => {
        // dispatch(setLoading(true))
        try {
        const response = await apiConnector("DELETE", REJECT_REQUEST_API, {"userName" : names}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        dispatch(getAllUsers());

        } catch (error) {
            console.log(token);
            console.log(names);
        dispatch(logout(navigate))
        console.log("GET_USER_DETAILS API ERROR............", error)
        }
        // dispatch(setLoading(false))
    }
}

export function deleterequest(token,names,navigate) {
    return async (dispatch) => {
        // dispatch(setLoading(true))
        console.log("frontend mein names is ...", names);
        try {
        const response = await apiConnector("DELETE", DELETE_REQUEST_API, {"userName":names}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        dispatch(getAllUsers());

        } catch (error) {
        // dispatch(logout(navigate))
        }
    }
}