
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,

};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updatedUserStart: (state) => {
      state.loading = true;
    },
    updatedUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updatedUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signoutStart: (state) => {
      state.loading = true;
    },
    signoutSuccess: (state) => {
      state.loading = false;
      state.currentUser = null;
      state.error = null;
    },
    signOutFailure: (state,action) => {
      state.loading=false;
      state.error=action.payload
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updatedUserStart,
  updatedUserSuccess,
  updatedUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutStart,
  signoutSuccess,
  signOutFailure

} = userSlice.actions;

export default userSlice.reducer;