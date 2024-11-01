import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  userData: "",
  userLocation: "",
  displayStore: false,
  dataCart: [],
  favoriteStores: []
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
    setFavoriteStores: (state, action) => {
      const storePresent = state.favoriteStores.find(
        (store) =>
          store[0]?.text === action.payload[0]?.text
      );

      if (!storePresent) {
        state.favoriteStores = [...state.favoriteStores, action.payload];
      }
    },
    removeFavoriteStores: (state, action) => {
      state.favoriteStores = state.favoriteStores.filter((store) => store[0]?.text !== action.payload);
    },
    resetAuthState: (state) => {
      state.user = false;
      state.userData = "";
      state.userLocation = "";
      state.displayStore = false;
      state.dataCart = [];
      state.favoriteStores = [];
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
  setFavoriteStores,
  removeFavoriteStores,
} = userSlice.actions;

export default userSlice.reducer;
