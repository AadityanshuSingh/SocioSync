import { combineReducers } from 'redux';
import authReducer from './Slices/authSlice';
import chatReducer from './Slices/chatSlice';
import onlineReducer from './Slices/onlineSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  online: onlineReducer,
});



export default rootReducer;