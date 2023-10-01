"use client";
import { configureStore, ThunkAction, Action, compose } from "@reduxjs/toolkit";
import { mainSlice } from "./mainSlice";
import { createWrapper } from "next-redux-wrapper";


const makeStore = () =>
  configureStore({
    reducer: {
      [mainSlice.name]: mainSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const store = makeStore();


export const wrapper = createWrapper<AppStore>(makeStore);
