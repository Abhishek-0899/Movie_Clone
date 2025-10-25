import { createSlice } from "@reduxjs/toolkit";
// createSlice is a helper that automatically creates a reducer and actions in one place.
// in simple reducer + actions automatically.

const initialState = {
  bannerData: [],
  imageUrl: "",
};

export const MovieSlice = createSlice({
  name: "Movie", // identify actions and the slice in the store. example "Movie/setBannerData"
  initialState,
  reducers: {
    // define how state will update
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const { setBannerData, setImageUrl } = MovieSlice.actions;

export default MovieSlice.reducer;
