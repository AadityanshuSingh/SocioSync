import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { friendsEndpoints} from "../apis"
import { logout } from "./authAPI"

const { SEND_REQUEST_API } = friendsEndpoints
const { ACCEPT_REQUEST_API } = friendsEndpoints
const { DELETE_REQUEST_API } = friendsEndpoints
const { REJECT_REQUEST_API } = friendsEndpoints


export function sendrequest(token,names,navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
        const response = await apiConnector("POST", SEND_REQUEST_API, names, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        // const userImage = response.data.data.image
        //   ? response.data.data.image
        //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        // dispatch(setUser({ ...response.data.data, image: userImage }))
        } catch (error) {
        dispatch(logout(navigate))
        console.log("GET_USER_DETAILS API ERROR............", error)
        toast.error("Could Not Get User Details")
        }
        dispatch(setLoading(false))
    }
}

export function acceptrequest(token,names,navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
        const response = await apiConnector("POST", ACCEPT_REQUEST_API, names, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        // const userImage = response.data.data.image
        //   ? response.data.data.image
        //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        // dispatch(setUser({ ...response.data.data, image: userImage }))
        } catch (error) {
        dispatch(logout(navigate))
        console.log("GET_USER_DETAILS API ERROR............", error)
        toast.error("Could Not Get User Details")
        }
        dispatch(setLoading(false))
    }
}

export function rejectrequest(token,names,navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
        const response = await apiConnector("POST", REJECT_REQUEST_API, names, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        // const userImage = response.data.data.image
        //   ? response.data.data.image
        //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        // dispatch(setUser({ ...response.data.data, image: userImage }))
        } catch (error) {
        dispatch(logout(navigate))
        console.log("GET_USER_DETAILS API ERROR............", error)
        toast.error("Could Not Get User Details")
        }
        dispatch(setLoading(false))
    }
}

export function deleterequest(token,names,navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
        const response = await apiConnector("POST", DELETE_REQUEST_API, names, {
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        // const userImage = response.data.data.image
        //   ? response.data.data.image
        //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        // dispatch(setUser({ ...response.data.data, image: userImage }))
        } catch (error) {
        dispatch(logout(navigate))
        console.log("GET_USER_DETAILS API ERROR............", error)
        toast.error("Could Not Get User Details")
        }
        dispatch(setLoading(false))
    }
}