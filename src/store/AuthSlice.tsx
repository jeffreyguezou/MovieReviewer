import { createSlice } from "@reduxjs/toolkit";
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    userName: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userName = action.payload.userName;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userName = null;
    },
  },
});
export default AuthSlice.reducer;
export const authActions = AuthSlice.actions;
