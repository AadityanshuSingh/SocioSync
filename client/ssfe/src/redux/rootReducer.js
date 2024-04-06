import { combineReducers } from "redux";
import authReducer from "./Slices/authSlice";
import chatReducer from "./Slices/chatSlice";
import onlineReducer from "./Slices/onlineSlice";
import profileSlice from "./Slices/profileSlice";
import searchSlice from "./Slices/searchSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  online: onlineReducer,
  profile: profileSlice,
  search: searchSlice,
});

export default rootReducer;
