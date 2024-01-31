import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Slices/authSlice";
import { chatSlice } from "./Slices/chatSlice";
import { onlineSlice } from "./Slices/onlineSlice";

// TODO :- combineReducer
export const store = configureStore({
    reducer:{
        auth: authSlice.reducer,
        chat: chatSlice.reducer,
        online: onlineSlice.reducer,
    }
});

