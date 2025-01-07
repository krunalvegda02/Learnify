import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    LoginUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    LogoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { LoginUser, LogoutUser } = authSlice.actions;
export default authSlice.reducer;
