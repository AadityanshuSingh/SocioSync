import { createSlice } from '@reduxjs/toolkit';

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    onlineList: [],
  },
  reducers: {
    addDetails :(state, action) => {
      // takes a full object which was submitted during signup
      state.onlineList.push(action.payload);
    },
    removeDetails :(state) => {
     //  takes a full object which was submitted during signup
      return state.onlineList = [];
    },
  },
});

export const { addUser, removeUser } = signupSlice.actions;
export default signupSlice.reducer;