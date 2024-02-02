import { useToast } from "@chakra-ui/react"
import { setLoading, setToken } from "../../redux/Slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  FORGOTPASSWORD_API,
  CHANGEPASSWORD_API,
} = endpoints

export function sendOtp(email, navigate) {
    // this function is sending emailid to the sendOTP function
    // in the backend so that it can send email to the desired email id
  return async () => {
    
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email
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
      navigate("/verifyemail")
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
  }
}

export function signUp(
    email,
    name,
    userName,
    password,
    confirmPassword,
    otp,
    navigate
  ) {
    return async () => {
      console.log("the otp in signUp is", otp)
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          "email": email,
          "name": name,
          "userName": userName,
          "password": password,
          "confirmPassword": confirmPassword,
          "otp": otp
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


export function login(email, password, userName, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
        const response = await apiConnector("POST", LOGIN_API, {
            email,
            userName,
            password,
        })

        console.log("LOGIN API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("Login Successful")
        dispatch(setToken(response.data.token))
        // updating the slice token to store the token details
        const userImage = response.data.user.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
        dispatch(setUser({ ...response.data.user, image: userImage }))
        navigate("/dashboard/my-profile")
        } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
      toast.success("Logged Out")
      navigate("/")
    }
}

export function changePassword(oldPassword, newPassword, confirmPassword, navigate) {
  return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
      const response = await apiConnector("POST", CHANGEPASSWORD_API, {
          oldPassword,
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
      // TODO:-navigate to my profile
      // navigate("/dashboard/my-profile")
      }
      // TODO:-navigate to my profile
      dispatch(setLoading(false))
      toast.dismiss(toastId)
  }
}


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