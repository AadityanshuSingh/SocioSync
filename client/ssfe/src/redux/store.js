import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Slices/authSlice";
import { chatSlice } from "./Slices/friendSlice";
import { onlineSlice } from "./Slices/onlineSlice";
import { signupSlice } from "./Slices/signupSlice";

// TODO :- combineReducer
export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        chat: chatSlice.reducer,
        online: onlineSlice.reducer,
        signup: signupSlice.reducer,
    }
});

