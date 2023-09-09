import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setlogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setlogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
