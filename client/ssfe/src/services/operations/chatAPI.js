import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { chatEndpoints } from "../apis"

const { SEARCH_API } = chatEndpoints

export function search(query, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
        const response = await apiConnector("POST", SEARCH_API,query)
        // TODO:-might be a get request
        console.log("GET_USER_DETAILS API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        // const userImage = response.data.data.image
        //   ? response.data.data.image
        //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        // dispatch(setUser({ ...response.data.data, image: userImage }))
        } catch (error) {
            // dispatch(logout(navigate))
            console.log("GET_USER_DETAILS API ERROR............", error)
            toast.error("Could Not Get User Details")
        }
        dispatch(setLoading(false))
    }
}

