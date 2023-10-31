import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  userData: "",
  userLocation: "",
  displayStore: false,
  dataCart: [],
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
    setDisplayStore: (state, action) => {
      state.displayStore = action.payload;
    },
    setDataCart: (state, action) => {
      state.dataCart = action.payload;
    },
    resetAuthState: (state) => {
      state.user = false;
      state.userData = "";
      state.userLocation = "";
      state.displayStore = false;
      state.dataCart = [];
    },
  },
});

export const {
  setUser,
  setUserData,
  setUserLocation,
  setDisplayStore,
  resetAuthState,
  setDataCart,
} = userSlice.actions;

export default userSlice.reducer;
