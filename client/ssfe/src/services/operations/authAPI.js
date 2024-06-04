import { useToast } from "@chakra-ui/react";
import {
  setLoading,
  setLoginData,
  setToken,
} from "../../redux/Slices/authSlice";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { useSelector } from "react-redux";
import { setRoom } from "../../redux/Slices/onlineSlice";

const { SENDOTP_API, SIGNUP_API, LOGIN_API, FORGOTPASSWORD_API } = endpoints;

export function sendOtp(action, email, navigate) {
  // this function is sending emailid to the sendOTP function
  // in the backend so that it can send email to the desired email id
  return async () => {
    // dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
      });

      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.data.success);

      if (!response.data.success) {
        // can me response.success as well
        throw new Error(response.data.message);
      }
      navigate("/verify-email", {state: {message: action}});
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);
    }
  };
}

export function signUp(ultraNewSignupData, navigate) {
  return async () => {
    console.log("the otp in signUp is", ultraNewSignupData.otp);
    console.log("name in signup is ", ultraNewSignupData.name);
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        ultraNewSignupData,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      navigate("/signup");
    }
  };
}

export function login(formData, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        formData,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // updating the slice token to store the token details
      console.log("LOGIN API RESPONSE............", response);
      console.log("user login hua h", response.data.user.userName);
      dispatch(setToken(response.data.token));
      dispatch(setLoginData(response.data.user));
      console.log("data incoming for login data is",response.data.user)
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("logindata", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
    }
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setRoom(null));
    dispatch(setToken(null));
    localStorage.clear();
    navigate("/");
  };
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

export function forgotPassword(ultraNewSignupData,navigate)
{
  console.log("sending data", ultraNewSignupData);
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("PUT", FORGOTPASSWORD_API, {ultraNewSignupData});

      console.log("Change password API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // toast.success("Password changed Successfully");
    } catch (error) {
      console.log("FORGOTPASSWORD API ERROR............", error);
      // toast.error("Password could not be changed");
      navigate("/forgotPassword");
    }
    console.log("password change ho gya");
    navigate("/login");
    dispatch(setLoading(false));
    // toast.dismiss(toastId);
  };
}
