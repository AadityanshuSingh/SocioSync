import { useToast } from "@chakra-ui/react"
import { setLoading, setLoginData, setToken } from "../../redux/Slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import { useSelector } from "react-redux"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  FORGOTPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {

    // this function is sending emailid to the sendOTP function
    // in the backend so that it can send email to the desired email id
  return async () => {
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
      })

      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        // can me response.success as well
        throw new Error(response.data.message)
      }

      // toast({
      //   title:"OTP Sent Successfully",
      //   duration: 3000,
      //   status:'success',
      //   isClosable: true, 
      // })
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      // toast({
      //   title: 'Error in Sending OTP',
      //   description:"Please try again",
      //   status: 'error',
      //   duration: 3000,
      //   isClosable: true,
      // })
    }
    // dispatch(setLoading(false))
  }
}

export function signUp(ultraNewSignupData, navigate) {
    return async () => {
      console.log("the otp in signUp is", ultraNewSignupData.otp);
      console.log("name in signup is ", ultraNewSignupData.name);
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          ultraNewSignupData
        })

        console.log("SIGNUP API RESPONSE............", response)

        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        navigate("/login")
      } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        navigate("/signup")
      }
    }
  }


  export function login(formData, navigate) {
    return async (dispatch) => {
        try {
        const response = await apiConnector("POST", LOGIN_API, {
            formData
        })

        console.log("LOGIN API RESPONSE............", response)
        console.log("user login hua h", response.data.user.userName)
        dispatch(setToken(response.data.token))
        dispatch(setLoginData(response.data.user))
        localStorage.setItem("authToken", response.data.token);
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        // updating the slice token to store the token details
        // const userImage = response.data.user.image
        //     ? response.data.user.image
        //     : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        // dispatch(setUser({ ...response.data.user, image: userImage }))
        navigate("/dashboard")
        } catch (error) {
        console.log("LOGIN API ERROR............", error)
        }
    }
}


export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      navigate("/")
    }
}

// export function changePassword(oldPassword, newPassword, confirmPassword, navigate) {
//   return async (dispatch) => {
//       const toastId = toast.loading("Loading...")
//       dispatch(setLoading(true))
//       try {
//       const response = await apiConnector("POST", CHANGEPASSWORD_API, {
//           oldPassword,
//           newPassword,
//           confirmPassword,
//           navigate,
//       })

//       console.log("Change password API RESPONSE............", response)

//       if (!response.data.success) {
//           throw new Error(response.data.message)
//       }

//       toast.success("Password changed Successfully")
//       }

//       catch (error) {
//       console.log("LOGIN API ERROR............", error)
//       toast.error("Password could not be changed")
//       // TODO:-navigate to my profile
//       // navigate("/dashboard/my-profile")
//       }
//       // TODO:-navigate to my profile
//       dispatch(setLoading(false))
//       toast.dismiss(toastId)
//   }
// }


export function forgotPassword(email, otp, newPassword, confirmPassword, navigate) {
  return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", FORGOTPASSWORD_API, {
            email,
            otp,
            newPassword,
            confirmPassword,
            navigate,
        })

        console.log("Change password API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("Password changed Successfully")
      }

      catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Password could not be changed")
        navigate("/forgotPassword")
      }
      navigate("/login")
      dispatch(setLoading(false))
      toast.dismiss(toastId)
  }
}