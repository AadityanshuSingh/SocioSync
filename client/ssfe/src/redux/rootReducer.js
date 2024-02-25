import { combineReducers } from 'redux';
import authReducer from './Slices/authSlice';
import chatReducer from './Slices/chatSlice';
import onlineReducer from './Slices/onlineSlice';
import profileSlice from './Slices/profileSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  online: onlineReducer,
  profile: profileSlice
});



export default rootReducer;