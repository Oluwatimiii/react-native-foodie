import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  userData: "",
  userLocation: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
  },
});

export const { setUser, setUserData, setUserLocation } = userSlice.actions;

export default userSlice.reducer;
