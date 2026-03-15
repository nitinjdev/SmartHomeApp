import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isInternet: false,
  isUserLoggedIn: false,
  userInfo: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateInternetStatus: (state, action) => {
      state.isInternet = action.payload;
    },
    updateUserLoggedStatus: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const {
  updateInternetStatus,
  updateUserLoggedStatus,
  updateUserInfo
} = authSlice.actions;

export default authSlice.reducer;
