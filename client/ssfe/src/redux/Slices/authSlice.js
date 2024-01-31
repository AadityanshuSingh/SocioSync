import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    signupData: null,
    loading: false,
    token: null,
  },
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;