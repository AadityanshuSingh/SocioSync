import { toast } from "react-hot-toast";
import { setUser } from "../../redux/Slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { profileSettingsEndpoints } from "../apis";
import { logout } from "./authAPI";
import { useSelector } from "react-redux";
const {
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  //   DELETE_PROFILE_API,
} = profileSettingsEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      // console.log(formData);
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        null,
        formData,
        {
          "Content-Type": "multipart/form-data",
          // to be studied
          Authorization: `Bearer ${token}`,
        }
      );
      console.log(
        "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
        response
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Display Picture Updated Successfully");
      dispatch(setUser(response.data.data));
    } catch (error) {
      console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    }
    toast.dismiss(toastId);
  };
}

export function updateProfile(token, formData) {
  // const {user} = useSelector((state) => state.profile);
  return async (dispatch) => {
    // const {user} = useSelector((state) => state.profile);
    const toastId = toast.loading("Loading...");
    //form data aaya ya nhii
    console.log("data to backend", formData);
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });
      // api connector sahi se liya ya nhi
      console.log("UPDATE_PROFILE_API API RESPONSE............", response);
      // respnse sahi se ya nhi
      console.log("response aaya", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      // const userImage = response.data.updatedUserDetails.image
      //   ? response.data.updatedUserDetails.image
      //   : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
      dispatch(setUser(response.data.updatedUserDetails));
      // console.log("updated profile is ", user);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("UPDATE_PROFILE_API API ERROR............", error);
      toast.error("Could Not Update Profile");
    }
    toast.dismiss(toastId);
  };
}

export async function changePassword(token, formData) {
  console.log("ic data", formData);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
      Authorization: `Bearer ${token}`,
    });
    console.log("CHANGE_PASSWORD_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password Changed Successfully");
  } catch (error) {
    console.log("CHANGE_PASSWORD_API API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
}
