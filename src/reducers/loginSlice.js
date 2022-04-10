import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loggedIn: null,
    userId: null,
  },
  reducers: {
    signIn(state, action) {
      state.loggedIn = true;
      if (state.userId === null) state.userId = action.payload;
    },
    signOut(state, action) {
      state.loggedIn = false;
      state.userId = null;
    },
  },
});

export const { signIn, signOut } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;
