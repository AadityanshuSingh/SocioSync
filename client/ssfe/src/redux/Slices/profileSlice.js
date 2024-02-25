import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState : {
    user: null,
    allUsers:[],
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setAllUsers(state, action){
      state.allUsers = action.payload
    }
  },
});

export const { setUser, setAllUsers } = profileSlice.actions;

export default profileSlice.reducer;