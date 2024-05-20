import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUser: false,
  isSignUpModalVisible: false,
  userData: null,
};

export const authenticationReducer = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload.user;
      state.isUser = true; 
    },
    setSignUpModal: (state, action) => {
      state.isSignUpModalVisible = action.payload.isVisible;
    },
    logout: (state) => {
      state.userData = null;
      state.isUser = false;
    }
  },
});

export const { setUser, setSignUpModal, logout } = authenticationReducer.actions;

export default authenticationReducer.reducer;
