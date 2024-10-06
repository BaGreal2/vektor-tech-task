import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features";

export const store = configureStore({
  reducer: {
    counterState: counterSlice.reducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
