import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface MainSlice {
  authState: boolean;
  isNewFetch: boolean
}

// Initial state
const initialState: MainSlice = {
  authState: false,
  isNewFetch: false
};

// Actual Slice
export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },
    setNewFetch(state, action){
      state.isNewFetch = action.payload
    }

  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setAuthState, setNewFetch } = mainSlice.actions;


export default mainSlice.reducer;
